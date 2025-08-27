import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;
    const httpMethod: unknown = context.switchToHttp().getRequest().method;
    console.log(response);
    let message: unknown = '';

    return next.handle().pipe(
      map(data => {
        switch (httpMethod) {
          case 'GET':
            message = 'Data get successfully';
            break;
          case 'POST':
            message = 'Data created successfully';
            break;
          case 'PATCH':
          case 'PUT':
            message = 'Data updated successfully';
            break;
          case 'DELETE':
            message = 'Data deleted successfully';
            break;
          default:
            message = 'Success';
            break;
        }

        return {
          statusCode,
          message,
          data,
        };
      }),
      catchError(err => {
        const statusCode = err instanceof HttpException ? err.getStatus() : 500;
        const errorResponse = {
          statusCode,
          message: err.message || new InternalServerErrorException(),
          error: err.name || 'Error',
          timestamp: Date.now(),
          data: {},
        };
        return throwError(() => new HttpException(errorResponse, statusCode));
      }),
    );
  }
}
