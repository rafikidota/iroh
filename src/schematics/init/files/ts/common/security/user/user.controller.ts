import { Controller } from '@nestjs/common';
import { Auth, GenericUserController } from '@rafikidota/iroh';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Auth()
@ApiBearerAuth()
@ApiTags(User.name)
@Controller(User.name.toLowerCase())
export class UserController extends GenericUserController(User) {
  constructor(readonly service: UserService) {
    super(service);
  }
}
