import { NotFoundException, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindOneOptions,
  FindManyOptions,
  Repository,
} from 'typeorm';
import { LoggerOptions, RepositoryLogger } from '../logger';
import { GenericPersistent } from '../entity/generic.persistent';
import { IGenericRepository } from '../interfaces/crud.repository';
import { SearchDto } from '../dto/search.dto';

export function GenericTypeOrmRepository<
  T extends GenericPersistent,
  D extends DeepPartial<T>,
>(E: Type<T>) {
  class TypeOrmRepository implements IGenericRepository<T, D> {
    public readonly logger: RepositoryLogger;
    constructor(@InjectRepository(E) readonly repository: Repository<T>) {
      this.logger = new RepositoryLogger(E.name);
    }

    public async create(createDto: D): Promise<T> {
      this.logger.restart();
      const entity = await this.repository.save(createDto);
      this.logger.created(entity.id);
      return entity as unknown as T;
    }

    public async paginate(query: SearchDto): Promise<T[]> {
      this.logger.restart();
      const options = {} as unknown as FindManyOptions<T>;
      const { limit, page, offset } = query;
      if (limit) {
        options.take = limit;
      }
      if (page && limit) {
        options.skip = (page - 1) * limit;
      }
      if (offset) {
        options.skip = offset;
      }
      const entities = await this.repository.find(options);
      const length = entities.length;
      this.logger.foundMany({ limit, page, offset, length });
      return entities;
    }

    public async findAll() {
      return await this.repository.find();
    }

    public async findOne(id: string, options: LoggerOptions): Promise<T> {
      this.logger.restart();
      const { name } = this.repository.metadata;
      const where = { where: { id } } as unknown as FindOneOptions<T>;
      const entity = await this.repository.findOne(where);
      if (!entity) {
        this.logger.warn(`[${id}] NOT FOUND`);
        throw new NotFoundException(`${name} with id ${id} not found`);
      }
      if (options.logging) {
        this.logger.foundOne(id);
      }
      return entity as unknown as T;
    }

    public async update(entity: T, updateDto: Partial<D>): Promise<T> {
      this.logger.restart();
      Object.assign(entity, updateDto);
      const updatedEntity = await this.repository.save(entity);
      this.logger.updated(updatedEntity.id);
      return updatedEntity as unknown as T;
    }

    public async remove(entity: T): Promise<void> {
      const { id } = entity;
      this.logger.restart();
      await this.repository.softDelete(id);
      this.logger.removed(id);
    }
  }
  return TypeOrmRepository;
}
