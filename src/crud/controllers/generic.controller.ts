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
import { Entity, UseEntityGuard } from '../decorators';
import { GenericPersistentEntity } from '../entity';
import { LoggerOptions } from '../services';
import { DeepPartial } from 'typeorm';
import { SearchPaginateDto } from '../dto';
import type { IGenericController, IGenericService } from '../interfaces';

export function BuildCRUDController<
  T extends GenericPersistentEntity,
  D extends DeepPartial<T>,
>(E: new () => T) {
  class GenericController implements IGenericController<T, D> {
    constructor(readonly service: IGenericService<T, D>) {}

    @Post()
    create(@Body() body: D) {
      return this.service.create(body);
    }

    @Get()
    paginate(@Query() query: SearchPaginateDto) {
      return this.service.paginate(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      const options: LoggerOptions = { logging: true };
      return this.service.findOne(id, options);
    }

    @Patch(':id')
    @UseEntityGuard(E)
    update(@Entity() entity: T, @Body() body: Partial<D>) {
      return this.service.update(entity, body);
    }

    @Delete(':id')
    @HttpCode(204)
    @UseEntityGuard(E)
    remove(@Entity() entity: T) {
      return this.service.remove(entity);
    }
  }

  return GenericController;
}
