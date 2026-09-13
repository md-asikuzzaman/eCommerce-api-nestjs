import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

interface ExceptionResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

interface HttpResponse {
  status(code: number): HttpResponse;
  json(body: {
    success: false;
    message: string | string[];
    statusCode: number;
  }): void;
}

function isExceptionResponse(value: unknown): value is ExceptionResponse {
  return typeof value === 'object' && value !== null;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<HttpResponse>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[];

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (isExceptionResponse(exceptionResponse)) {
        message = exceptionResponse.message ?? 'An error occurred';
      } else {
        message = 'An error occurred';
      }
    } else {
      message = 'Internal server error';
    }

    response.status(status).json({
      success: false,
      message,
      statusCode: status,
    });
  }
}
