import { Injectable } from '@nestjs/common';
import { GenericPermissionService } from '@rafikidota/iroh';
import { PermissionPersistent } from './infra/permission.persistent';
import { PermissionMapper } from './infra/permission.mapper';
import { PermissionRepository } from './infra/permission.repository';

@Injectable()
export class PermissionService extends GenericPermissionService(
  PermissionPersistent,
  PermissionMapper,
) {
  constructor(readonly repository: PermissionRepository) {
    super(repository);
  }
}
