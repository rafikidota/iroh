import { NotFoundException, Type } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { AppError, ErrorHandler } from './../../common';
import { ServiceLogger, LoggerOptions } from '../logger';
import { GenericDomain, GenericPersistent, GenericView } from '../mapper';
import type {
  IGenericService,
  IGenericRepository,
  IEntityMapper,
} from '../interfaces';
import { SearchDto } from '../dto/search.dto';

export function GenericService<
  T extends GenericPersistent,
  D extends GenericDomain,
  V extends GenericView,
  M extends IEntityMapper<T, D, V>,
  DTO extends DeepPartial<T>,
>(E: Type<T>, Mapper: Type<M>) {
  class GenericCRUDService implements IGenericService<T, DTO, V> {
    public readonly logger: ServiceLogger;
    public readonly handler: ErrorHandler;
    public readonly mapper: M;
    constructor(readonly repository: IGenericRepository<T, DTO>) {
      this.logger = new ServiceLogger(E.name);
      this.handler = ErrorHandler.getInstance();
      this.mapper = new Mapper();
    }

    public async create(createDto: DTO): Promise<V> {
      try {
        this.logger.restart();
        const entity = await this.repository.create(createDto);
        this.logger.created(entity.id);
        const domain = this.mapper.PersistToDomain(entity);
        const view = this.mapper.DomainToView(domain);
        return view as unknown as V;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async paginate(query: SearchDto): Promise<V[]> {
      try {
        this.logger.restart();
        const { limit, page, offset } = query;
        const entities: T[] = await this.repository.paginate(query);
        if (!entities || !entities.length) {
          return [] as unknown as V[];
        }
        const length = entities.length;
        const views: V[] = [];
        entities.forEach((entity) => {
          const domain = this.mapper.PersistToDomain(entity);
          const view = this.mapper.DomainToView(domain);
          views.push(view as unknown as V);
        });
        this.logger.foundMany({ limit, page, offset, length });
        return views;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findAll() {
      try {
        const entities: T[] = await this.repository.findAll();
        if (!entities || !entities.length) {
          return [] as unknown as V[];
        }
        const views: V[] = [];
        entities.forEach((entity) => {
          const domain = this.mapper.PersistToDomain(entity);
          const view = this.mapper.DomainToView(domain);
          views.push(view as unknown as V);
        });
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findOne(id: string, options: LoggerOptions): Promise<V> {
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
        const domain = this.mapper.PersistToDomain(entity);
        const view = this.mapper.DomainToView(domain);
        return view as unknown as V;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async update(entity: T, updateDto: Partial<DTO>): Promise<V> {
      try {
        this.logger.restart();
        Object.assign(entity, updateDto);
        const updatedEntity = await this.repository.update(entity, updateDto);
        this.logger.updated(updatedEntity.id);
        const domain = this.mapper.PersistToDomain(entity);
        const view = this.mapper.DomainToView(domain);
        return view as unknown as V;
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
