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
import { DeepPartial } from 'typeorm';
import {
  Entity,
  EntityGuard,
  LoggerOptions,
  SearchPaginateDto,
} from '../../crud';
import { IGenericController, IGenericService } from '../../crud/interfaces';
import { GenericUser } from './user.generic';

export function BuildGenericUserController<
  T extends GenericUser,
  D extends DeepPartial<T>,
>(E: new () => T) {
  abstract class GenericUserController implements IGenericController<T, D> {
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
    @EntityGuard(E)
    update(@Entity() entity: T, @Body() body: Partial<D>) {
      return this.service.update(entity, body);
    }

    @Delete(':id')
    @HttpCode(204)
    @EntityGuard(E)
    remove(@Entity() entity: T) {
      return this.service.remove(entity);
    }
  }

  return GenericUserController;
}
