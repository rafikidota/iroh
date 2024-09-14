import { GenericDomain } from '@rafikidota/iroh';
import { <%= classify(name) %>Persistent } from '../infra/<%= lowercase(name) %>.persistent';

export class <%= classify(name) %>Domain extends GenericDomain {
  name: string;

  constructor(persistent: <%= classify(name) %>Persistent) {
    super();
    this.id = persistent.id;
    this.createdAt = persistent.createdAt;
    this.updatedAt = persistent.updatedAt;
    this.deletedAt = persistent.deletedAt;
  }
}
