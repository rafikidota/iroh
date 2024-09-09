import { Entity, OneToMany } from 'typeorm';
import { GenericRole } from '@rafikidota/iroh';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Role extends GenericRole {
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
