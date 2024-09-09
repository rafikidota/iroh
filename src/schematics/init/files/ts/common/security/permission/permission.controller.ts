import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GenericPermissionController, SecurityGuard } from '@rafikidota/iroh';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/permission.create.dto';
import { UpdatePermissionDto } from './dto/permission.update.dto';

@SecurityGuard()
@ApiBearerAuth()
@ApiTags(Permission.name)
@Controller(Permission.name.toLowerCase())
export class PermissionController extends GenericPermissionController(
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto,
) {
  constructor(readonly service: PermissionService) {
    super(service);
  }
}
