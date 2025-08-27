// common/decorators/serialize.decorator.ts
import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/response/Serialize.Interceptor';

export function Serialize(dto) {
  return UseInterceptors(new SerializeInterceptor(dto));
}