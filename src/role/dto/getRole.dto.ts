import { Expose, Type } from 'class-transformer';
import { UserRoleResDto } from 'src/user/dto/user-role-res.dto';

export class GetRoleDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => UserRoleResDto)
  users: UserRoleResDto[];
}
