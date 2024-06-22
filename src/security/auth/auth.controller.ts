import { Get, UseGuards } from '@nestjs/common';
import { GenericUser, User } from '../user';
import { IGenericAuthController, IGenericAuthService } from './interfaces';
import { BasicAuthGuard } from './guards';

export function BuildGenericAuthController<T extends GenericUser>() {
  abstract class GenericAuthController implements IGenericAuthController<T> {
    constructor(readonly service: IGenericAuthService<T>) {}

    @Get('signup')
    signup(@User() user: T) {
      return this.service.signup(user);
    }

    @Get('signin')
    @UseGuards(BasicAuthGuard)
    signin(@User() user: T) {
      return this.service.signin(user);
    }

    @Get('signout')
    signout(@User() user: T) {
      return this.service.signout(user);
    }
  }
  return GenericAuthController;
}
