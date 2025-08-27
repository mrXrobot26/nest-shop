import { Exclude, Expose } from 'class-transformer';
import { IsString, IsInt, IsEmail } from 'class-validator';

export class getUserDto {
  @IsString()
  @IsEmail()
  @Expose()
  email: string;
  @IsString()
  @Expose()
  firstName: string;
  @IsString()
  @Expose()
  lastName: string;
  @IsInt()
  @Expose()
  age: number;
}
