import { GenericUser } from '@rafikidota/iroh';
import { Entity, ManyToOne } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class User extends GenericUser {
  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;
}