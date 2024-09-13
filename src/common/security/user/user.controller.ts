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
import { GenericUser, GenericUserDomain, GenericUserView } from './entity';
import { HttpExceptionFilter, LoggingInterceptor } from '../../../common';

export function GenericUserController<
  T extends GenericUser,
  DTO extends DeepPartial<T>,
  U extends Partial<T>,
  D extends GenericUserDomain,
  V extends GenericUserView,
>(E: Type<T>, CreateDto: Type<DTO>, UpdateDto: Type<U>, View: Type<V>) {
  @UseInterceptors(LoggingInterceptor)
  @UseFilters(HttpExceptionFilter)
  abstract class GenericUserController
    implements IGenericController<T, DTO, V>
  {
    constructor(readonly service: IGenericService<T, DTO, D, V>) {}

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
    async create(@Body() body: DTO): Promise<V> {
      const domain = await this.service.create(body);
      const view = this.service.mapper.DomainToView(domain);
      return view;
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
    @ApiResponse({ status: 401, description: 'User needs a valid auth' })
    @ApiResponse({ status: 403, description: 'User needs a valid permission' })
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
    @ApiResponse({ status: 401, description: 'User needs a valid auth' })
    @ApiResponse({ status: 403, description: 'User needs a valid permission' })
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
    @ApiResponse({ status: 401, description: 'User needs a valid auth' })
    @ApiResponse({ status: 403, description: 'User needs a valid permission' })
    @EntityGuard(E)
    @HttpCode(204)
    async remove(@Entity() entity: T): Promise<void> {
      await this.service.remove(entity);
    }
  }

  return GenericUserController;
}
