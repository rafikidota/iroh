import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GenericAuthController } from '@rafikidota/iroh';
import { AuthService } from './auth.service';
import { UserPersistent } from '../user/infra/user.persistent';
import { CreateUserDto } from '../user/app/dto';
import { UserView } from '../user/infra/user.view';

@ApiTags('Auth')
@Controller('auth')
export class AuthController extends GenericAuthController(
  UserPersistent,
  CreateUserDto,
  UserView,
) {
  constructor(readonly service: AuthService) {
    super(service);
  }
}
