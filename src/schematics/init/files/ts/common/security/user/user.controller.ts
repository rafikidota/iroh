import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GenericUserController, SecurityGuard } from '@rafikidota/iroh';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import { UserView } from './entities/user.view';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
@SecurityGuard()
export class UserController extends GenericUserController(
  User,
  CreateUserDto,
  UpdateUserDto,
  UserView,
) {
  constructor(readonly service: UserService) {
    super(service);
  }
}
