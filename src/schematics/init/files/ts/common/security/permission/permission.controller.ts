import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GenericPermissionController, SecurityGuard } from '@rafikidota/iroh';
import { PermissionService } from './permission.service';
import { PermissionPersistent } from './infra/permission.persistent';
import { CreatePermissionDto, UpdatePermissionDto } from './app/dto';
import { PermissionView } from './infra/permission.view';

@ApiBearerAuth()
@ApiTags('Permission')
@Controller('permission')
@SecurityGuard(PermissionPersistent)
export class PermissionController extends GenericPermissionController(
  PermissionPersistent,
  CreatePermissionDto,
  UpdatePermissionDto,
  PermissionView,
) {
  constructor(readonly service: PermissionService) {
    super(service);
  }
}
