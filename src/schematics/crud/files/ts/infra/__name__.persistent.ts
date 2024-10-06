import { Entity } from 'typeorm';
import { GenericPersistent } from '@rafikidota/iroh';
import { I<%= classify(name) %> } from '../domain';


@Entity('<%= dashToUnderscore(name) %>')
export class <%= classify(name) %>Persistent extends GenericPersistent implements I<%= classify(name) %> {}
