import { GenericUser } from '@rafikidota/iroh';
import { Entity } from 'typeorm';

@Entity()
export class User extends GenericUser {}
