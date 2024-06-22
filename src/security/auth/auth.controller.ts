import { Get, HttpCode, UseGuards } from '@nestjs/common';
import { BasicAuthGuard, JwtAuthGuard } from './guards';
import { GenericUser, User } from '../user';
import { IGenericAuthController, IGenericAuthService } from './interfaces';

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
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    signout(@User() user: T) {
      return this.service.signout(user);
    }
  }
  return GenericAuthController;
}
