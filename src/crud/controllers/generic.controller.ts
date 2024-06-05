import { Post, Body, Get, Query, Param, Patch, Delete } from '@nestjs/common';
import { SearchPaginateDto } from '../dto/search.paginate.dto';
import { UpdateDto } from '../dto';
import { GenericService } from '../services/generic.service';
import { DeepPartial } from 'typeorm';

export class GenericController<T> {
  constructor(readonly service: GenericService<T>) {}

  @Post()
  create(@Body() body: DeepPartial<T>) {
    return this.service.create(body);
  }

  @Get()
  paginate(@Query() query: SearchPaginateDto) {
    return this.service.paginate(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
