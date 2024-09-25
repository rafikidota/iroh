import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GenericUserController, SecurityGuard } from '@rafikidota/iroh';
import { UserService } from './user.service';
import { UserPersistent } from './infra/user.persistent';
import { CreateUserDto, UpdateUserDto } from './app/dto';
import { UserView } from './infra/user.view';
import { PermissionPersistent } from '../permission/infra/permission.persistent';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
@SecurityGuard(PermissionPersistent)
export class UserController extends GenericUserController(
  UserPersistent,
  CreateUserDto,
  UpdateUserDto,
  UserView,
) {
  constructor(readonly service: UserService) {
    super(service);
  }
}
