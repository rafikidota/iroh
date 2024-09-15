import { Injectable } from '@nestjs/common';
import { GenericTypeOrmRepository } from '@rafikidota/iroh';
import { PermissionPersistent } from './permission.persistent';

@Injectable()
export class PermissionRepository extends GenericTypeOrmRepository(
  PermissionPersistent,
) {}
