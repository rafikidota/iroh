import { DeepPartial, Repository } from 'typeorm';
import { SearchPaginateDto } from '../dto/search.paginate.dto';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { Logger, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`${this.repository.metadata.name} not found`);
    }
    return entity;
  }

  async update(id: string, updateDto: Partial<GenericDto>) {
    const entity = await this.findOne(id);
    if (entity) {
      await this.repository.update(id, updateDto);
    }
    return this.findOne(id);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
