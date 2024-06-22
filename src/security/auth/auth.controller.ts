import { Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { BasicAuthGuard, NoPermission, Public } from './decorators';
import { GenericUser } from '../user/entity';
import { JwtAuthGuard } from './guards';
import { IGenericAuthController, IGenericAuthService } from './interfaces';
import { User } from '../user';

export function BuildGenericAuthController<T extends GenericUser>(
  E: new () => T,
) {
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
    @BasicAuthGuard(E)
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
