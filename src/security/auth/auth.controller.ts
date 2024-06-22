import { Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { BasicAuthGuard, JwtAuthGuard } from './guards';
import { GenericUser, User } from '../user';
import { IGenericAuthController, IGenericAuthService } from './interfaces';
import { NoPermission, Public } from './decorators';

export function BuildGenericAuthController<T extends GenericUser>() {
  abstract class GenericAuthController implements IGenericAuthController<T> {
    constructor(readonly service: IGenericAuthService<T>) {}

    @Get('signup')
    @ApiBearerAuth()
    @NoPermission()
    signup(@User() user: T) {
      return this.service.signup(user);
    }

    @Get('signin')
    @ApiBasicAuth()
    @Public()
    @UseGuards(BasicAuthGuard)
    signin(@User() user: T) {
      return this.service.signin(user);
    }

    @Get('signout')
    @ApiBearerAuth()
    @NoPermission()
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    signout(@User() user: T) {
      return this.service.signout(user);
    }
  }
  return GenericAuthController;
}
