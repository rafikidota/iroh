import { Injectable } from '@nestjs/common';
import { GenericTypeOrmRepository } from '@rafikidota/iroh';
import { UserPersistent } from './user.persistent';

@Injectable()
export class UserRepository extends GenericTypeOrmRepository(UserPersistent) {}
