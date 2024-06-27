import { Injectable } from '@nestjs/common';
import { GenericUserService } from '@rafikidota/iroh';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends GenericUserService(User) {}
