import { Injectable } from '@nestjs/common';
import { GenericUserService } from '@rafikidota/iroh';
import { UserPersistent } from './infra/user.persistent';
import { UserMapper } from './infra';
import { UserRepository } from './infra/user.repository';

@Injectable()
export class UserService extends GenericUserService(
  UserPersistent,
  UserMapper,
) {
  constructor(readonly repository: UserRepository) {
    super(repository);
  }
}
