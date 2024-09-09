import { GenericPermissionSeeder } from '@rafikidota/iroh';
import { Permission } from './entities/permission.entity';

export class PermissionSeeder extends GenericPermissionSeeder(Permission) {}
