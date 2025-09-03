import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './createRole.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
