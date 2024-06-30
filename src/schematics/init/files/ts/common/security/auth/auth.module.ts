import { GenericAuthModule } from '@rafikidota/iroh';
import { User } from '../user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

export class AuthModule extends GenericAuthModule(
  User,
  AuthController,
  AuthService,
) {}
