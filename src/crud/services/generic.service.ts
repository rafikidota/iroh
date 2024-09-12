import { NotFoundException, Type } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { AppError, ErrorHandler } from './../../common';
import { ServiceLogger, LoggerOptions } from '../logger';
import { GenericPersistent } from '../mapper';
import { IGenericService, IGenericRepository } from '../interfaces';
import { SearchDto } from '../dto/search.dto';

export function GenericService<
  T extends GenericPersistent,
  D extends DeepPartial<T>,
>(E: Type<T>) {
  class GenericCRUDService implements IGenericService<T, D> {
    public readonly logger: ServiceLogger;
    public readonly handler: ErrorHandler;
    constructor(readonly repository: IGenericRepository<T, D>) {
      this.logger = new ServiceLogger(E.name);
      this.handler = ErrorHandler.getInstance();
    }

    public async create(createDto: D): Promise<T> {
      try {
        this.logger.restart();
        const entity = await this.repository.create(createDto);
        this.logger.created(entity.id);
        return entity as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async paginate(query: SearchDto): Promise<T[]> {
      try {
        this.logger.restart();
        const { limit, page, offset } = query;
        const entities = await this.repository.paginate(query);
        const length = entities.length;
        this.logger.foundMany({ limit, page, offset, length });
        return entities;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findAll() {
      try {
        return await this.repository.findAll();
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findOne(id: string, options: LoggerOptions): Promise<T> {
      try {
        this.logger.restart();
        const entity = await this.repository.findOne(id, options);
        if (!entity) {
          this.logger.warn(`[${id}] NOT FOUND`);
          throw new NotFoundException(`${E.name} with id ${id} not found`);
        }
        if (options.logging) {
          this.logger.foundOne(entity.id);
        }
        return entity as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async update(entity: T, updateDto: Partial<D>): Promise<T> {
      try {
        this.logger.restart();
        Object.assign(entity, updateDto);
        const updatedEntity = await this.repository.update(entity, updateDto);
        this.logger.updated(updatedEntity.id);
        return updatedEntity as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async remove(entity: T): Promise<void> {
      try {
        this.logger.restart();
        await this.repository.remove(entity);
        this.logger.removed(entity.id);
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }
  }
  return GenericCRUDService;
}
