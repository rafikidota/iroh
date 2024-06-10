import { DeepPartial, Repository } from 'typeorm';
import { SearchPaginateDto } from '../dto/search.paginate.dto';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { NotFoundException } from '@nestjs/common';
import { DefaultDto } from '../dto/default.dto';
import { GenericLogger } from '../logger/generic.logger';

export class GenericService<
  Entity extends GenericPersistentEntity,
  GenericDto extends DefaultDto = DefaultDto,
> {
  protected logger: GenericLogger;
  private context: string;
  constructor(
    protected readonly repository: Repository<Entity> &
      Repository<GenericPersistentEntity>,
  ) {
    this.context = `${repository.metadata.name}Logger`;
    this.logger = new GenericLogger(this.context);
  }
  async create(createDto: DeepPartial<GenericDto>) {
    this.logger.restart();
    const entity = await this.repository.save(createDto);
    this.logger.post(`[${entity.id}]`);
    return entity;
  }

  async paginate(query: SearchPaginateDto) {
    this.logger.restart();
    const { limit, page } = query;
    const entities = await this.repository.find();
    this.logger.get(`${JSON.stringify({ limit, page })}`);
    return entities;
  }

  async findAll() {
    this.logger.restart();
    const entities = await this.repository.find();
    this.logger.get(`find all`);
    return entities;
  }

  async findOne(id: string) {
    this.logger.restart();
    const { name } = this.repository.metadata;
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      this.logger.warn(`[${id}] NOT FOUND`);
      throw new NotFoundException(`${name} with id [${id}] not found`);
    }
    this.logger.get(`[${entity.id}]`);
    return entity;
  }

  async update(entity: Entity, updateDto: Partial<GenericDto>) {
    this.logger.restart();
    Object.assign(entity, updateDto);
    const updatedEntity = await this.repository.save(entity);
    this.logger.patch(`[${updatedEntity.id}]`);
    return updatedEntity;
  }

  async remove(id: string) {
    this.logger.restart();
    await this.repository.softDelete(id);
    this.logger.delete(`[${id}]`);
  }
}
