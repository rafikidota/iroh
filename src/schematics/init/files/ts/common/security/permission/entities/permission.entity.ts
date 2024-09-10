import { Entity, ManyToMany } from 'typeorm';
import { GenericPermission } from '@rafikidota/iroh';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class Permission extends GenericPermission {
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
