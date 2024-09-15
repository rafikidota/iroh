import { Entity, ManyToMany } from 'typeorm';
import { GenericPermission } from '@rafikidota/iroh';
import { RolePersistent } from '../../role/infra/role.persistent';

@Entity('permission')
export class PermissionPersistent extends GenericPermission {
  @ManyToMany(() => RolePersistent, (role) => role.permissions)
  roles: RolePersistent[];
}
