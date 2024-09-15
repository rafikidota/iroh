import { GenericUserDomain } from '@rafikidota/iroh';
import { UserPersistent } from '../infra';

export class UserDomain extends GenericUserDomain {
  constructor(persistent: UserPersistent) {
    super();
    this.id = persistent.id;
    this.name = persistent.name;
    this.lastName = persistent.lastName;
    this.username = persistent.username;
    this.email = persistent.email;
    this.password = persistent.password;
    this.type = persistent.type;
    this.createdAt = persistent.createdAt;
    this.updatedAt = persistent.updatedAt;
    this.deletedAt = persistent.deletedAt;
  }
}
