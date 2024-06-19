import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { SearchPaginateDto } from '../dto/search.paginate.dto';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { NotFoundException } from '@nestjs/common';
import { GenericLogger } from '../logger/generic.logger';
import { LoggerOptions } from './util/logger.options';
import { handleDatabaseError } from '../../common/util/error-handler';
import { AppError } from '../../common/error/app.error';
import { IGenericService } from 'src/intefaces/ICRUD.service';

export class GenericService<
  Entity extends GenericPersistentEntity,
  GenericDto extends DeepPartial<Entity>,
> implements IGenericService<Entity, GenericDto>
{
  protected logger: GenericLogger;
  private context: string;
  constructor(protected readonly repository: Repository<Entity>) {
    this.context = `${repository.metadata.name}Logger`;
    this.logger = new GenericLogger(this.context);
  }
  async create(createDto: GenericDto): Promise<Entity> {
    try {
      this.logger.restart();
      const entity = await this.repository.save(createDto);
      this.logger.post(`[${entity.id}]`);
      return entity as unknown as Entity;
    } catch (error) {
      handleDatabaseError(error as AppError);
    }
  }

  async paginate(query: SearchPaginateDto): Promise<Entity[]> {
    try {
      this.logger.restart();
      const { limit, page } = query;
      const entities = await this.repository.find();
      this.logger.get(`${JSON.stringify({ limit, page })}`);
      return entities;
    } catch (error) {
      handleDatabaseError(error as AppError);
    }
  }

  async findAll() {
    try {
      this.logger.restart();
      const entities = await this.repository.find();
      this.logger.get(`find all`);
      return entities;
    } catch (error) {
      handleDatabaseError(error as AppError);
    }
  }

  async findOne(id: string, options: LoggerOptions): Promise<Entity> {
    try {
      this.logger.restart();
      const { name } = this.repository.metadata;
      const where = { where: { id } } as unknown as FindOneOptions<Entity>;
      const entity = await this.repository.findOne(where);
      if (!entity) {
        this.logger.warn(`[${id}] NOT FOUND`);
        throw new NotFoundException(`${name} with id ${id} not found`);
      }
      if (options.logging) {
        this.logger.get(`[${entity.id}]`);
      }
      return entity as unknown as Entity;
    } catch (error) {
      handleDatabaseError(error as AppError);
    }
  }

  async update(
    entity: Entity,
    updateDto: Partial<GenericDto>,
  ): Promise<Entity> {
    try {
      this.logger.restart();
      Object.assign(entity, updateDto);
      const updatedEntity = await this.repository.save(entity);
      this.logger.patch(`[${updatedEntity.id}]`);
      return updatedEntity as unknown as Entity;
    } catch (error) {
      handleDatabaseError(error as AppError);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      this.logger.restart();
      await this.repository.softDelete(id);
      this.logger.delete(`[${id}]`);
    } catch (error) {
      handleDatabaseError(error as AppError);
    }
  }
}
