import {
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeepPartial } from 'typeorm';
import { Entity, EntityGuard } from '../decorators';
import { GenericPersistentEntity } from '../entity';
import { LoggerOptions } from '../services';
import { SearchPaginateDto } from '../dto';
import type { IGenericController, IGenericService } from '../interfaces';

export function BuildGenericController<
  T extends GenericPersistentEntity,
  D extends DeepPartial<T>,
>(E: new () => T) {
  abstract class GenericCRUDController implements IGenericController<T, D> {
    constructor(readonly service: IGenericService<T, D>) {}

    @Post()
    @ApiBearerAuth()
    create(@Body() body: D) {
      return this.service.create(body);
    }

    @Get()
    @ApiBearerAuth()
    paginate(@Query() query: SearchPaginateDto) {
      return this.service.paginate(query);
    }

    @Get(':id')
    @ApiBearerAuth()
    findOne(@Param('id') id: string) {
      const options: LoggerOptions = { logging: true };
      return this.service.findOne(id, options);
    }

    @Patch(':id')
    @ApiBearerAuth()
    @EntityGuard(E)
    update(@Entity() entity: T, @Body() body: Partial<D>) {
      return this.service.update(entity, body);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @EntityGuard(E)
    @HttpCode(204)
    remove(@Entity() entity: T) {
      return this.service.remove(entity);
    }
  }

  return GenericCRUDController;
}
