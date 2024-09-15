import { Injectable } from '@nestjs/common';
import { GenericUserService } from '@rafikidota/iroh';
import { UserPersistent } from './infra/user.persistent';
import { UserMapper } from './infra';

@Injectable()
export class UserService extends GenericUserService(
  UserPersistent,
  UserMapper,
) {}
