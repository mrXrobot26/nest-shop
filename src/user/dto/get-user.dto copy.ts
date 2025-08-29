import { Exclude, Expose } from 'class-transformer';
import { IsString, IsInt, IsEmail } from 'class-validator';

export class getUserDto {
  @Expose()
  id:Number
  @Expose()
  email: string;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  age: number;
}
