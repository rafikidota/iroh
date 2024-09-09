import { Entity } from 'typeorm';
import { GenericPermission } from '@rafikidota/iroh';

@Entity()
export class Permission extends GenericPermission {}
