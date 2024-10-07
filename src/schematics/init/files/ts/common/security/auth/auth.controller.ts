import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GenericAuthController } from '@rafikidota/iroh';
import { AuthService } from './auth.service';
import { UserPersistent } from '../user/infra/user.persistent';
import { CreateUserDto } from '../user/app/dto';
import { AuthResponse } from './app';

@ApiTags('Auth')
@Controller('auth')
export class AuthController extends GenericAuthController(
  UserPersistent,
  CreateUserDto,
  AuthResponse,
) {
  constructor(readonly service: AuthService) {
    super(service);
  }
}
