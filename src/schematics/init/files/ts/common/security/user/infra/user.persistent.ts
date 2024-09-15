import { GenericUser } from '@rafikidota/iroh';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RolePersistent } from '../../role/infra/role.persistent';

@Entity('user')
export class UserPersistent extends GenericUser {
  @ManyToOne(() => RolePersistent, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: RolePersistent;
}
