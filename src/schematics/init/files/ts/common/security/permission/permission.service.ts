import { Injectable } from '@nestjs/common';
import { GenericPermissionService } from '@rafikidota/iroh';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService extends GenericPermissionService(Permission) {}
