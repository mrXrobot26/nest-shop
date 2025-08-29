// common/interceptors/serialize.interceptor.ts
import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';


export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data) => {
        return plainToClass(this.dto, data, {// Transform the data to the specified DTO class
          excludeExtraneousValues: true, // Only include @Expose() decorated properties
        });
      }),
    );
  }
}
// plainToClass(ClassType, plainObject, options?)