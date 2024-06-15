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
import { SearchPaginateDto } from '../dto/search.paginate.dto';
import { GenericService } from '../services/generic.service';
import { DeepPartial } from 'typeorm';
import { DefaultDto } from '../dto/default.dto';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { FindOneOptions } from '../services';
import { Entity, UseEntityGuard } from '../decorators';

export class GenericController<
  T extends GenericPersistentEntity,
  D extends DefaultDto,
> {
  constructor(readonly service: GenericService<T, D>) {}

  @Post()
  create(@Body() body: DeepPartial<D>) {
    return this.service.create(body);
  }

  @Get()
  paginate(@Query() query: SearchPaginateDto) {
    return this.service.paginate(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const options: FindOneOptions = { logging: true };
    return this.service.findOne(id, options);
  }

  @Patch(':id')
  @UseEntityGuard(GenericService)
  update(@Entity() entity: T, @Body() body: Partial<D>) {
    return this.service.update(entity, body);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseEntityGuard(GenericService)
  remove(@Entity() entity: T) {
    return this.service.remove(entity.id);
  }
}
