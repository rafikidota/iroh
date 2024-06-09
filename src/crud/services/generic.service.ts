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
  private context: string;
  constructor(
    protected readonly repository: Repository<Entity> &
      Repository<GenericPersistentEntity>,
  ) {
    this.context = `${repository.metadata.name}Logger`;
  }
  async create(createDto: DeepPartial<GenericDto>) {
    this.logger = new Logger(this.context, { timestamp: true });
    const entity = await this.repository.save(createDto);
    this.logger.debug(`[${entity.id}] CREATED`);
    return entity;
  }

  paginate(query: SearchPaginateDto) {
    this.logger = new Logger(this.context, { timestamp: true });
    const { limit, page } = query;
    this.logger.log(`FIND ${limit} ELEMENTS FROM PAGE ${page}`);
    return this.repository.find();
  }

  findAll() {
    this.logger.log(`find all`);
    return this.repository.find();
  }

  async findOne(id: string) {
    this.logger = new Logger(this.context, { timestamp: true });
    const { name } = this.repository.metadata;
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`${name} not found with id [${id}]`);
    }
    this.logger.log(`[${entity.id}] FOUND`);
    return entity;
  }

  async update(id: string, updateDto: Partial<GenericDto>) {
    this.logger = new Logger(this.context, { timestamp: true });
    await this.repository.update(id, updateDto);
    this.logger.debug(`[${id}] UPDATED`);
    return this.findOne(id);
  }

  async remove(id: string) {
    this.logger = new Logger(this.context, { timestamp: true });
    await this.repository.softDelete(id);
    this.logger.debug(`[${id}] REMOVED`);
  }
}
