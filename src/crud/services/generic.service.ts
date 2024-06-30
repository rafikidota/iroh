import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, Type } from '@nestjs/common';
import { AppError, ErrorHandler } from './../../common';
import { GenericLogger, LoggerOptions } from '../logger';
import { GenericPersistent } from '../entity/generic.persistent';
import { IGenericService } from '../interfaces/crud.service';
import { SearchDto } from '../dto/search.dto';

export function GenericService<
  T extends GenericPersistent,
  D extends DeepPartial<T>,
>(E: Type<T>) {
  class GenericCRUDService implements IGenericService<T, D> {
    public readonly logger: GenericLogger;
    public readonly handler: ErrorHandler;
    constructor(@InjectRepository(E) readonly repository: Repository<T>) {
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

    public async paginate(query: SearchDto): Promise<T[]> {
      try {
        this.logger.restart();
        const { limit, page, offset } = query;
        const take = limit || 10;
        const skip = offset || (page - 1) * limit || 0;
        const entities = await this.repository.find({ take, skip });
        this.logger.get(
          `[Paginate - Limit: ${limit}, Page: ${page}, Found: ${entities.length}]`,
        );
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
