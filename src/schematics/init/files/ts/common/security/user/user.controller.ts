import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, GenericUserController } from '@rafikidota/iroh';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/user.update.dto';

@AuthGuard()
@ApiBearerAuth()
@ApiTags(User.name)
@Controller(User.name.toLowerCase())
export class UserController extends GenericUserController(User, CreateUserDto, UpdateUserDto) {
  constructor(readonly service: UserService) {
    super(service);
  }
}
