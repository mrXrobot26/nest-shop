import { Expose } from 'class-transformer';

export class UserRoleResDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  email: string;
}
