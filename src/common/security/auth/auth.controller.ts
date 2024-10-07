import {
  Body,
  Get,
  HttpCode,
  Post,
  Type,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import {
  CreateGenericUserDto,
  HttpExceptionFilter,
  LoggingInterceptor,
} from '../../../common';
import { BasicAuthGuard, Public, SecurityGuard } from './decorators';
import { User } from '../user/decorators';
import { NoPermission } from '../permission/decorators';
import {
  IAuthResponse,
  IGenericAuthController,
  IGenericAuthService,
} from './interfaces';

import { GenericUser, GenericUserView } from '../user/entity';

export function GenericAuthController<
  T extends GenericUser,
  DTO extends CreateGenericUserDto,
  V extends GenericUserView,
  R extends IAuthResponse<V>,
>(E: Type<T>, CreateDto: Type<DTO>, View: Type<R>) {
  @UseFilters(HttpExceptionFilter)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UseInterceptors(LoggingInterceptor)
  class GenericAuthController implements IGenericAuthController<T, DTO, V, R> {
    constructor(readonly service: IGenericAuthService<T, DTO, V, R>) {}

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
    signup(@Body() body: DTO): Promise<R> {
      return this.service.signup(body) as Promise<R>;
    }

    @Get('signin')
    @ApiBasicAuth()
    @BasicAuthGuard(E)
    @ApiResponse({
      status: 201,
      description: `${E.name} was created successfully`,
      type: View,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: `${E.name} not found` })
    signin(@User() user: T): Promise<R> {
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
