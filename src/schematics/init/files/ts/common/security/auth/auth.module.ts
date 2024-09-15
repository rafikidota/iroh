import { GenericAuthModule } from '@rafikidota/iroh';
import { UserPersistent } from '../user/infra/user.persistent';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

export class AuthModule extends GenericAuthModule(
  UserPersistent,
  AuthController,
  AuthService,
) {}
