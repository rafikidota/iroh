import {
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import {
  DefaultDto,
  Entity,
  FindOneOptions,
  SearchPaginateDto,
} from '../../crud';
import { GenericUser } from './user.generic';
import { GenericUserService } from './user.service';

export class GenericUserController<
  User extends GenericUser,
  CreateUserDto extends DefaultDto,
> {
  constructor(readonly service: GenericUserService<User, CreateUserDto>) {}

  @Post()
  create(@Body() body: DeepPartial<CreateUserDto>) {
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
  update(@Entity() entity: User, @Body() body: Partial<CreateUserDto>) {
    return this.service.update(entity, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Entity() entity: User) {
    return this.service.remove(entity.id);
  }
}
