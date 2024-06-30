import { Entity } from 'typeorm';
import { GenericPersistent } from '@rafikidota/iroh';

@Entity()
export class <%= classify(name) %> extends GenericPersistent {}
