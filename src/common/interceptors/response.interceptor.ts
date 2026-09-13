import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RESPONSE_MESSAGE_KEY } from '../decorators/message.decorator';

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ServiceResponse {
  meta?: PaginationMeta;
  [key: string]: unknown;
}

export interface ApiResponse<T> {
  success: true;
  message: string;
  statusCode: number;
  data: T;
  meta?: PaginationMeta;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor<
  ServiceResponse,
  ApiResponse<Record<string, unknown>>
> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<ServiceResponse>,
  ): Observable<ApiResponse<Record<string, unknown>>> {
    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ??
      'Request successful';

    const response = context
      .switchToHttp()
      .getResponse<{ statusCode: number }>();

    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((result) => {
        const { meta, ...data } = result;

        return {
          success: true,
          message,
          statusCode,
          data,
          ...(meta && { meta }),
        };
      }),
    );
  }
}
