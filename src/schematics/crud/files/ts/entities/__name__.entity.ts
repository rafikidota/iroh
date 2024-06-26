import { Entity } from 'typeorm';
import { GenericPersistentEntity } from '@rafikidota/iroh';

@Entity()
export class <%= classify(name) %> extends GenericPersistentEntity {}
