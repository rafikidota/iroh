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
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { DeepPartial } from 'typeorm';
import { Entity, EntityGuard, LoggerOptions, SearchDto } from '../../../crud';
import type {
  IGenericController,
  IGenericService,
} from '../../../crud/interfaces';
import { GenericRole } from './entity/role.generic';

export function GenericRoleController<
  T extends GenericRole,
  D extends DeepPartial<T>,
  U extends Partial<T>,
>(E: Type<T>, CreateDto: Type<D>, UpdateDto: Type<U>) {
  abstract class GenericRoleController implements IGenericController<T, D> {
    constructor(readonly service: IGenericService<T, D>) {}

    @Post()
    @ApiBody({ type: CreateDto })
    @ApiResponse({
      status: 201,
      description: `${E.name} was created successfully`,
      type: E,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'User needs a valid auth' })
    @ApiResponse({ status: 403, description: 'User needs a valid permission' })
    create(@Body() body: D) {
      return this.service.create(body);
    }

    @Get()
    @ApiResponse({
      status: 200,
      description: `List of ${E.name.toLocaleLowerCase()}s`,
      type: E,
      isArray: true,
    })
    @ApiResponse({ status: 401, description: 'User needs a valid auth' })
    @ApiResponse({ status: 403, description: 'User needs a valid permission' })
    paginate(@Query() query: SearchDto) {
      return this.service.paginate(query);
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: `${E.name} found by id`, type: E })
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
      type: E,
    })
    @ApiResponse({ status: 401, description: 'User needs a valid auth' })
    @ApiResponse({ status: 403, description: 'User needs a valid permission' })
    @EntityGuard(E)
    update(@Entity() entity: T, @Body() body: Partial<D>) {
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

  return GenericRoleController;
}
