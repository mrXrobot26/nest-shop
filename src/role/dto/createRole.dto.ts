import { IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(5)
  description: string;
}
