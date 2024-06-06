import { DeepPartial, Repository } from 'typeorm';
import { SearchPaginateDto } from '../dto/search.paginate.dto';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { Logger } from '@nestjs/common';
import { DefaultDto } from '../dto/default.dto';

export class GenericService<
  Entity extends GenericPersistentEntity,
  GenericDto extends DefaultDto = DefaultDto,
> {
  protected logger: Logger;

  constructor(
    protected readonly repository: Repository<Entity> &
      Repository<GenericPersistentEntity>,
  ) {
    this.logger = new Logger();
  }
  create(createDto: DeepPartial<GenericDto>) {
    return this.repository.save(createDto);
  }

  paginate(query: SearchPaginateDto) {
    console.log(query);
    return this.repository.find();
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    console.log(id);
    return this.repository.findOne({ where: {} });
  }

  update(id: string, updateDto: Partial<GenericDto>) {
    return this.repository.update(id, updateDto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
``;
