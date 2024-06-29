import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, Type } from '@nestjs/common';
import { AppError, ErrorHandler } from './../../common';
import { GenericLogger, LoggerOptions } from '../logger';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { IGenericService } from '../interfaces/crud.service';
import { SearchPaginateDto } from '../dto/search.paginate.dto';

export function GenericService<
  T extends GenericPersistentEntity,
  D extends DeepPartial<T>,
>(E: Type<T>) {
  class GenericCRUDService implements IGenericService<T, D> {
    constructor(
      @InjectRepository(E) readonly repository: Repository<T>,
      readonly logger: GenericLogger,
      readonly handler: ErrorHandler,
    ) {
      const { name } = this.repository.metadata;
      const context = `${name}Logger`;
      this.logger = new GenericLogger(context);
      this.handler = ErrorHandler.getInstance();
    }

    public async create(createDto: D): Promise<T> {
      try {
        this.logger.restart();
        const entity = await this.repository.save(createDto);
        this.logger.post(`[${entity.id}]`);
        return entity as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async paginate(query: SearchPaginateDto): Promise<T[]> {
      try {
        this.logger.restart();
        const { limit, page } = query;
        const entities = await this.repository.find();
        this.logger.get(`${JSON.stringify({ limit, page })}`);
        return entities;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findAll() {
      try {
        this.logger.restart();
        const entities = await this.repository.find();
        this.logger.get(`find all`);
        return entities;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findOne(id: string, options: LoggerOptions): Promise<T> {
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
        this.handler.catch(error as AppError);
      }
    }

    public async update(entity: T, updateDto: Partial<D>): Promise<T> {
      try {
        this.logger.restart();
        Object.assign(entity, updateDto);
        const updatedEntity = await this.repository.save(entity);
        this.logger.patch(`[${updatedEntity.id}]`);
        return updatedEntity as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async remove(entity: T): Promise<void> {
      try {
        const { id } = entity;
        this.logger.restart();
        await this.repository.softDelete(id);
        this.logger.delete(`[${id}]`);
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }
  }
  return GenericCRUDService;
}
