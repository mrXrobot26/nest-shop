import { IsIn } from 'class-validator';
import { Permission } from 'src/permission/entities/permission.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Endpoint {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  path: string;
  @Column({ type: 'enum', enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'] })
  method: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => Permission, permission => permission.endpoints)
  permissions: Permission[];
}
