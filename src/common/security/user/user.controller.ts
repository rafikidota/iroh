import {
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  HttpCode,
  Type,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Entity, EntityGuard, LoggerOptions, SearchDto } from '../../../crud';
import type {
  IGenericController,
  IGenericService,
} from '../../../crud/interfaces';
import { GenericUser } from './entity/user.generic';
import { HttpExceptionFilter, LoggingInterceptor } from '../../../common';
import { GenericUserView } from './entity/user.view';

export function GenericUserController<
  T extends GenericUser,
  DTO extends DeepPartial<T>,
  U extends Partial<T>,
  V extends GenericUserView,
>(E: Type<T>, CreateDto: Type<DTO>, UpdateDto: Type<U>, View: Type<V>) {
  @UseInterceptors(LoggingInterceptor)
  @UseFilters(HttpExceptionFilter)
  abstract class GenericUserController
    implements IGenericController<T, DTO, V>
  {
    constructor(readonly service: IGenericService<T, DTO, V>) {}

    @Post()
    @ApiBody({ type: CreateDto })
    @ApiResponse({
      status: 201,
      description: `${E.name} was created successfully`,
      type: View,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'User needs a valid auth' })
    @ApiResponse({ status: 403, description: 'User needs a valid permission' })
    create(@Body() body: DTO) {
      return this.service.create(body);
    }

    @Get()
    @ApiResponse({
      status: 200,
      description: `List of ${E.name.toLocaleLowerCase()}s`,
      type: View,
      isArray: true,
    })
    @ApiResponse({ status: 401, description: 'User needs a valid auth' })
    @ApiResponse({ status: 403, description: 'User needs a valid permission' })
    paginate(@Query() query: SearchDto) {
      return this.service.paginate(query);
    }

    @Get(':id')
    @ApiResponse({
      status: 200,
      description: `${E.name} found by id`,
      type: View,
    })
    @ApiResponse({ status: 401, description: 'User needs a valid auth' })
    @ApiResponse({ status: 403, description: 'User needs a valid permission' })
    findOne(@Param('id') id: string) {
      const options: LoggerOptions = { logging: true };
      return this.service.findOne(id, options);
    }

    @Patch(':id')
    @ApiBody({ type: UpdateDto })
    @ApiResponse({
      status: 200,
      description: `${E.name} was updated successfully`,
      type: View,
    })
    @ApiResponse({ status: 401, description: 'User needs a valid auth' })
    @ApiResponse({ status: 403, description: 'User needs a valid permission' })
    @EntityGuard(E)
    update(@Entity() entity: T, @Body() body: Partial<DTO>) {
      return this.service.update(entity, body);
    }

    @Delete(':id')
    @ApiResponse({
      status: 204,
      description: `${E.name} was deleted  successfully`,
    })
    @ApiResponse({ status: 401, description: 'User needs a valid auth' })
    @ApiResponse({ status: 403, description: 'User needs a valid permission' })
    @EntityGuard(E)
    @HttpCode(204)
    remove(@Entity() entity: T) {
      return this.service.remove(entity);
    }
  }

  return GenericUserController;
}
