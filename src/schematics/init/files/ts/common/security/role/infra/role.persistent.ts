import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { GenericRole } from '@rafikidota/iroh';
import { UserPersistent } from '../../user/infra/user.persistent';
import { Permission } from '../../permission/entities/permission.entity';

@Entity('role')
export class RolePersistent extends GenericRole {
  @OneToMany(() => UserPersistent, (user) => user.role)
  users: UserPersistent[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    eager: true,
  })
  @JoinTable({
    name: 'role_permission',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}
