import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GenericRoleController, SecurityGuard } from '@rafikidota/iroh';
import { RoleService } from './role.service';
import { RolePersistent } from './infra/role.persistent';
import { CreateRoleDto, UpdateRoleDto } from './app/dto';
import { RoleView } from './app/dto/role.view';
import { PermissionPersistent } from '../permission/infra/permission.persistent';

@ApiBearerAuth()
@ApiTags('Role')
@Controller('role')
@SecurityGuard(PermissionPersistent)
export class RoleController extends GenericRoleController(
  RolePersistent,
  CreateRoleDto,
  UpdateRoleDto,
  RoleView,
) {
  constructor(readonly service: RoleService) {
    super(service);
  }
}
