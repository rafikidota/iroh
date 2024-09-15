import { GenericRoleDomain } from '@rafikidota/iroh';
import { RolePersistent } from '../infra';

export class RoleDomain extends GenericRoleDomain {
  constructor(persistent: RolePersistent) {
    super();
    this.id = persistent.id;
    this.name = persistent.name;
    this.description = persistent.description;
    this.createdAt = persistent.createdAt;
    this.updatedAt = persistent.updatedAt;
    this.deletedAt = persistent.deletedAt;
  }
}
