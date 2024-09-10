import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { GenericRole } from '@rafikidota/iroh';
import { User } from '../../user/entities/user.entity';
import { Permission } from '../../permission/entities/permission.entity';

@Entity()
export class Role extends GenericRole {
  @OneToMany(() => User, (user) => user.role)
  users: User[];

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
