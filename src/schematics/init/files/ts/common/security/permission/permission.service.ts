import { Injectable } from '@nestjs/common';
import { GenericPermissionService } from '@rafikidota/iroh';
import { PermissionPersistent } from './infra/permission.persistent';
import { PermissionMapper } from './infra/permission.mapper';

@Injectable()
export class PermissionService extends GenericPermissionService(
  PermissionPersistent,
  PermissionMapper,
) {}
