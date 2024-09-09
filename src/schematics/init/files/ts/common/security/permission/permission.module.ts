import { AuthModule } from '../auth/auth.module';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './permission.repository';
import { PermissionSeeder } from './permission.seeder';
import { Permission } from './entities/permission.entity';
import { GenericPermissionModule } from '@rafikidota/iroh';
export class PermissionModule extends GenericPermissionModule(
  Permission,
  PermissionController,
  PermissionService,
  PermissionRepository,
  PermissionSeeder,
  AuthModule,
) {}
