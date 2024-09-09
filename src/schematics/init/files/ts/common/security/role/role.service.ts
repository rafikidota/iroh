import { Injectable } from '@nestjs/common';
import { GenericRoleService } from '@rafikidota/iroh';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService extends GenericRoleService(Role) {}
