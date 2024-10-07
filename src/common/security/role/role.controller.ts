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
  UseInterceptors,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { DeepPartial } from 'typeorm';
import { Entity, EntityGuard, LoggerOptions, SearchDto } from '../../../crud';
import type {
  IGenericController,
  IGenericService,
} from '../../../crud/interfaces';
import { GenericRole } from './entity/role.persistent';
import { GenericRoleDomain, GenericRoleView } from './entity';
import { LoggingInterceptor } from './../../interceptors';
import { HttpExceptionFilter } from './../../filters';

export function GenericRoleController<
  T extends GenericRole,
  DTO extends DeepPartial<T>,
  U extends Partial<T>,
  D extends GenericRoleDomain,
  V extends GenericRoleView,
>(E: Type<T>, CreateDto: Type<DTO>, UpdateDto: Type<U>, View: Type<V>) {
  @UseFilters(HttpExceptionFilter)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UseInterceptors(LoggingInterceptor)
  class GenericRoleController implements IGenericController<T, DTO, V> {
    constructor(readonly service: IGenericService<T, DTO, D, V>) {}

    @Post()
    @ApiBody({ type: CreateDto })
    @ApiResponse({
      status: 201,
      description: `${E.name} was created successfully`,
      type: View,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async create(@Body() body: DTO): Promise<V> {
      const domain = await this.service.create(body);
      const view = this.service.mapper.DomainToView(domain);
      return view;
    }

    @Get()
    @ApiResponse({
      status: 200,
      description: `List of ${E.name}`,
      type: View,
      isArray: true,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async paginate(@Query() query: SearchDto): Promise<V[]> {
      const domains = await this.service.paginate(query);
      const views: V[] = [];
      domains.forEach((domain) => {
        const view = this.service.mapper.DomainToView(domain);
        views.push(view);
      });
      return views;
    }

    @Get(':id')
    @ApiResponse({
      status: 200,
      description: `${E.name} found by id`,
      type: View,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async findOne(@Param('id') id: string): Promise<V> {
      const options: LoggerOptions = { logging: true };
      const domain = await this.service.findOne(id, options);
      const view = this.service.mapper.DomainToView(domain);
      return view;
    }

    @Patch(':id')
    @ApiBody({ type: UpdateDto })
    @ApiResponse({
      status: 200,
      description: `${E.name} was updated successfully`,
      type: View,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @EntityGuard(E)
    async update(@Entity() entity: T, @Body() body: Partial<DTO>): Promise<V> {
      const domain = await this.service.update(entity, body);
      const view = this.service.mapper.DomainToView(domain);
      return view;
    }

    @Delete(':id')
    @ApiResponse({
      status: 204,
      description: `${E.name} was deleted  successfully`,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @EntityGuard(E)
    @HttpCode(204)
    async remove(@Entity() entity: T): Promise<void> {
      await this.service.remove(entity);
    }
  }

  return GenericRoleController;
}
