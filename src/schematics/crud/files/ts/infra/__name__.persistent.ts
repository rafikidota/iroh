import { Entity } from 'typeorm';
import { GenericPersistent } from '@rafikidota/iroh';

@Entity('<%= dashToUnderscore(name) %>')
export class <%= classify(name) %>Persistent extends GenericPersistent {}
