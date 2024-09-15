import { GenericPermissionSeeder } from '@rafikidota/iroh';
import { PermissionPersistent } from './permission.persistent';

export class PermissionSeeder extends GenericPermissionSeeder(
  PermissionPersistent,
) {}
