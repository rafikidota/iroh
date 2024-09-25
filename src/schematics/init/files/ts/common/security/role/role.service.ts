import { Injectable } from '@nestjs/common';
import { GenericRoleService } from '@rafikidota/iroh';
import { RolePersistent } from './infra/role.persistent';
import { RoleMapper } from './infra/role.mapper';
import { RoleRepository } from './infra/role.repository';

@Injectable()
export class RoleService extends GenericRoleService(
  RolePersistent,
  RoleMapper,
) {
  constructor(readonly repository: RoleRepository) {
    super(repository);
  }
}
