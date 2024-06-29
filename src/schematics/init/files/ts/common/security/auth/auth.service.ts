import { Injectable } from '@nestjs/common';
import { GenericAuthService } from '@rafikidota/iroh';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService extends GenericAuthService(User) {}
