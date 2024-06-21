import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { AppError, handleDatabaseError } from './../../common';
import { GenericLogger } from '../logger/generic.logger';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { IGenericService } from '../interfaces/crud.service';
import { LoggerOptions } from './util/logger.options';
import { SearchPaginateDto } from '../dto/search.paginate.dto';

export function BuildCRUDService<
  T extends GenericPersistentEntity,
  D extends DeepPartial<T>,
>(E: new () => T) {
  abstract class GenericService implements IGenericService<T, D> {
    logger: GenericLogger;
    repository: Repository<T>;
    constructor(@InjectRepository(E) repo: Repository<T>) {
      this.repository = repo;
      const { name } = repo.metadata;
      const context = `${name}Logger`;
      this.logger = new GenericLogger(context);
    }

    async create(createDto: D): Promise<T> {
      try {
        this.logger.restart();
        const entity = await this.repository.save(createDto);
        this.logger.post(`[${entity.id}]`);
        return entity as unknown as T;
      } catch (error) {
        handleDatabaseError(error as AppError);
      }
    }

    async paginate(query: SearchPaginateDto): Promise<T[]> {
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

    async findOne(id: string, options: LoggerOptions): Promise<T> {
      try {
        this.logger.restart();
        const { name } = this.repository.metadata;
        const where = { where: { id } } as unknown as FindOneOptions<T>;
        const entity = await this.repository.findOne(where);
        if (!entity) {
          this.logger.warn(`[${id}] NOT FOUND`);
          throw new NotFoundException(`${name} with id ${id} not found`);
        }
        if (options.logging) {
          this.logger.get(`[${entity.id}]`);
        }
        return entity as unknown as T;
      } catch (error) {
        handleDatabaseError(error as AppError);
      }
    }

    async update(entity: T, updateDto: Partial<D>): Promise<T> {
      try {
        this.logger.restart();
        Object.assign(entity, updateDto);
        const updatedEntity = await this.repository.save(entity);
        this.logger.patch(`[${updatedEntity.id}]`);
        return updatedEntity as unknown as T;
      } catch (error) {
        handleDatabaseError(error as AppError);
      }
    }

    async remove(entity: T): Promise<void> {
      try {
        const { id } = entity;
        this.logger.restart();
        await this.repository.softDelete(id);
        this.logger.delete(`[${id}]`);
      } catch (error) {
        handleDatabaseError(error as AppError);
      }
    }
  }
  return GenericService;
}
