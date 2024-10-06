import {
  Body,
  Get,
  HttpCode,
  Post,
  Type,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { DeepPartial } from 'typeorm';
import { HttpExceptionFilter, LoggingInterceptor } from '../../../common';
import { BasicAuthGuard, Public, SecurityGuard } from './decorators';
import { User } from '../user/decorators';
import { NoPermission } from '../permission/decorators';
import { IGenericAuthController, IGenericAuthService } from './interfaces';

import { GenericUser, GenericUserView } from '../user/entity';

export function GenericAuthController<
  T extends GenericUser,
  DTO extends DeepPartial<T>,
  V extends GenericUserView,
>(E: Type<T>, CreateDto: Type<DTO>, View: Type<V>) {
  @UseInterceptors(LoggingInterceptor)
  @UseFilters(HttpExceptionFilter)
  abstract class GenericAuthController implements IGenericAuthController<T> {
    constructor(readonly service: IGenericAuthService<T>) {}

    @Post('signup')
    @Public()
    @NoPermission()
    @ApiBody({ type: CreateDto })
    @ApiResponse({
      status: 201,
      description: `${E.name} was created successfully`,
      type: View,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    signup(@Body() body: DTO) {
      return this.service.signup(body);
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
    @SecurityGuard()
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
