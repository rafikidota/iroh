import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GenericAuthController } from '@rafikidota/iroh';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/user.create.dto';
import { UserView } from '../user/entities/user.view';


@ApiTags('Auth')
@Controller('auth')
export class AuthController extends GenericAuthController(
  User,
  CreateUserDto,
  UserView,
) {
  constructor(readonly service: AuthService) {
    super(service);
  }
}
