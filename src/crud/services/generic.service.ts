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
    this.logger = new Logger(repository.metadata.name);
  }
  async create(createDto: DeepPartial<GenericDto>) {
    const entity = await this.repository.save(createDto);
    this.logger.log(`[${entity.id}] created`);
    return entity;
  }

  paginate(query: SearchPaginateDto) {
    const { limit, page } = query;
    this.logger.log(`paginating ${limit} elements from page ${page}`);
    return this.repository.find();
  }

  findAll() {
    this.logger.log(`find all`);
    return this.repository.find();
  }

  async findOne(id: string) {
    const { name } = this.repository.metadata;
    const entity = await this.repository.findOne({ where: { id } });
    this.logger.log(`[${entity.id}] found`);
    if (!entity) {
      throw new NotFoundException(`${name} not found with id ${id}`);
    }
    return entity;
  }

  async update(id: string, updateDto: Partial<GenericDto>) {
    const entity = await this.findOne(id);
    if (entity) {
      await this.repository.update(id, updateDto);
    }
    this.logger.log(`[${entity.id}] updated`);
    return this.findOne(id);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    if (entity) {
      await this.repository.softDelete(id);
      this.logger.log(`[${entity.id}] removed`);
    }
  }
}
