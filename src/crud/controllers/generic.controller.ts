import {
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { Entity, UseEntityGuard } from '../decorators';
import { GenericPersistentEntity } from '../entity';
import { BuildCRUDService, LoggerOptions } from '../services';
import { DeepPartial } from 'typeorm';
import { IGenericController } from '../../intefaces/ICRUD.controller';
import { SearchPaginateDto } from '../dto';
import { IGenericService } from '../../intefaces';

export function BuildCRUDController<
  T extends GenericPersistentEntity,
  D extends DeepPartial<T>,
>(E: new () => T) {
  const GenericService = BuildCRUDService<T, D>(E);
  class GenericController implements IGenericController<T, D> {
    constructor(
      @Inject(GenericService) readonly service: IGenericService<T, D>,
    ) {}
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
