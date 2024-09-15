import { GenericPermissionDomain } from '@rafikidota/iroh';
import { PermissionPersistent } from '../infra';

export class PermissionDomain extends GenericPermissionDomain {
  constructor(persistent: PermissionPersistent) {
    super();
    this.id = persistent.id;
    this.name = persistent.name;
    this.description = persistent.description;
    this.method = persistent.method;
    this.code = persistent.code;
    this.path = persistent.path;
    this.createdAt = persistent.createdAt;
    this.updatedAt = persistent.updatedAt;
    this.deletedAt = persistent.deletedAt;
  }
}
