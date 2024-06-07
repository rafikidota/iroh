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
import { UpdateDto } from '../dto';
import { GenericService } from '../services/generic.service';
import { DeepPartial } from 'typeorm';
import { DefaultDto } from '../dto/default.dto';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { GetEntity } from '../decorators/get-entity.decorator';

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
  findOne(@Param('id') id: string, @GetEntity() entity: T) {
    console.log({ entity });
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetEntity() entity: T,
    @Body() body: UpdateDto,
  ) {
    console.log({ entity });
    return this.service.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string, @GetEntity() entity: T) {
    console.log({ entity });
    return this.service.remove(id);
  }
}
