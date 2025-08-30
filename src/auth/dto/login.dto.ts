import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class loginDTO {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
