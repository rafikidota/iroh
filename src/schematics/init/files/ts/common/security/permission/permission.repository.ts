import { Injectable } from '@nestjs/common';
import { GenericTypeOrmRepository } from '@rafikidota/iroh';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionRepository extends GenericTypeOrmRepository(
  Permission,
) {}
