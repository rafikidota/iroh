import { GenericDomain } from '@rafikidota/iroh';
import { <%= classify(name) %>Persistent } from '../infra/<%= lowerCase(name) %>.persistent';
import { I<%= classify(name) %> } from './<%= lowerCase(name) %>.interface';

export class <%= classify(name) %>Domain extends GenericDomain implements I<%= classify(name) %> {
  name: string;

  constructor(persistent: <%= classify(name) %>Persistent) {
    super();
    this.id = persistent.id;
    this.createdAt = persistent.createdAt;
    this.updatedAt = persistent.updatedAt;
    this.deletedAt = persistent.deletedAt;
  }
}
