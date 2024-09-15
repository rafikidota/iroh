import { Injectable } from '@nestjs/common';
import { GenericRoleService } from '@rafikidota/iroh';
import { RolePersistent } from './infra/role.persistent';
import { RoleMapper } from './infra/role.mapper';

@Injectable()
export class RoleService extends GenericRoleService(
  RolePersistent,
  RoleMapper,
) {}
