import { Injectable } from '@nestjs/common';
import { GenericTypeOrmRepository } from '@rafikidota/iroh';
import { RolePersistent } from './role.persistent';

@Injectable()
export class RoleRepository extends GenericTypeOrmRepository(RolePersistent) {}
