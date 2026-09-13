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

export interface ApiResponse<T> {
  success: true;
  message: string;
  statusCode: number;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ??
      'Request successful';

    const response = context
      .switchToHttp()
      .getResponse<{ statusCode: number }>();

    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message,
        statusCode,
        data,
      })),
    );
  }
}
