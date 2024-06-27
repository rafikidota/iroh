import { Controller } from '@nestjs/common';
import { GenericAuthController } from '@rafikidota/iroh';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController extends GenericAuthController(User) {
  constructor(readonly service: AuthService) {
    super(service);
  }
}
