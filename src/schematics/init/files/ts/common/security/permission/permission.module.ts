import { GenericPermissionModule } from '@rafikidota/iroh';
import { AuthModule } from '../auth/auth.module';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './infra/permission.repository';
import { PermissionSeeder } from './infra/permission.seeder';
import { PermissionPersistent } from './infra/permission.persistent';

export class PermissionModule extends GenericPermissionModule(
  PermissionPersistent,
  PermissionController,
  PermissionService,
  PermissionRepository,
  PermissionSeeder,
  AuthModule,
) {}
