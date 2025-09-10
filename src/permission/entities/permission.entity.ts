import { Endpoint } from 'src/endpoint/entities/endpoint.entity';
import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => Role, role => role.permission)
  role: Role;

  @ManyToMany(() => Endpoint, endpoint => endpoint.permissions)
  @JoinTable()
  endpoints: Endpoint[];
}
