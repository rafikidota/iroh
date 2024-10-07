import { Injectable } from '@nestjs/common';
import { GenericAuthService } from '@rafikidota/iroh';
import { UserPersistent } from '../user/infra/user.persistent';
import { UserMapper } from '../user';

@Injectable()
export class AuthService extends GenericAuthService(
  UserPersistent,
  UserMapper,
) {}
