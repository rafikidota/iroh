import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GenericUser } from '../user';
import { IGenericAuthController, IGenericAuthService } from './interfaces';
import { BasicAuthGuard } from './guards';

export function BuildGenericAuthController<T extends GenericUser>() {
  @Controller('auth')
  abstract class GenericAuthController implements IGenericAuthController<T> {
    constructor(readonly service: IGenericAuthService<T>) {}

    @Get('signin')
    @UseGuards(BasicAuthGuard)
    signin(@Req() req: Request) {
      return this.service.signin(req);
    }

    @Get('signup')
    signup(@Req() req: Request) {
      return this.service.signup(req);
    }

    @Get('signout')
    signout(@Req() req: Request) {
      return this.service.signout(req);
    }
  }
  return GenericAuthController;
}
