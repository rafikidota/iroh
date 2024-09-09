import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GenericRoleController, SecurityGuard } from '@rafikidota/iroh';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/role.create.dto';
import { UpdateRoleDto } from './dto/role.update.dto';

@SecurityGuard()
@ApiBearerAuth()
@ApiTags(Role.name)
@Controller(Role.name.toLowerCase())
export class RoleController extends GenericRoleController(
  Role,
  CreateRoleDto,
  UpdateRoleDto,
) {
  constructor(readonly service: RoleService) {
    super(service);
  }
}
