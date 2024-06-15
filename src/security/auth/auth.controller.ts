import { Post } from '@nestjs/common';
import { GenericAuthService } from './auth.service';
import { GenericUser } from '../user';

export class GenericAuthController<User extends GenericUser> {
  constructor(readonly service: GenericAuthService<User>) {}

  @Post()
  signin() {
    return this.service.signin();
  }

  @Post()
  signup() {
    return this.service.signup();
  }

  @Post()
  signout() {
    return this.service.signout();
  }
}
