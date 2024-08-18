import {
  Get,
  HttpCode,
  Type,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { BasicAuthGuard, NoPermission, Public } from './decorators';
import { GenericUser } from '../user/entity';
import { JwtAuthGuard } from './guards';
import { IGenericAuthController, IGenericAuthService } from './interfaces';
import { User } from '../user/decorators';
import { HttpExceptionFilter, LoggingInterceptor } from '../../../common';

export function GenericAuthController<
  T extends GenericUser,
  D extends DeepPartial<T>,
>(E: Type<T>, CreateDto: Type<D>) {
  @UseInterceptors(LoggingInterceptor)
  @UseFilters(HttpExceptionFilter)
  abstract class GenericAuthController implements IGenericAuthController<T> {
    constructor(readonly service: IGenericAuthService<T>) {}

    @Get('signup')
    @Public()
    @NoPermission()
    @ApiBody({ type: CreateDto })
    @ApiResponse({
      status: 201,
      description: `${E.name} was created successfully`,
      type: E,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    signup(@User() user: T) {
      return this.service.signup(user);
    }

    @Get('signin')
    @ApiBasicAuth()
    @BasicAuthGuard(E)
    @ApiResponse({
      status: 204,
      description: `Signin was done successfully`,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: `${E.name} not found` })
    signin(@User() user: T) {
      return this.service.signin(user);
    }

    @Get('signout')
    @ApiBearerAuth()
    @NoPermission()
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @ApiResponse({
      status: 204,
      description: `Signout was done successfully`,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: `${E.name} not found` })
    signout(@User() user: T) {
      return this.service.signout(user);
    }
  }
  return GenericAuthController;
}
