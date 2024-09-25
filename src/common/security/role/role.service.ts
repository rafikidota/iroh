import { DeepPartial } from 'typeorm';
import { NotFoundException, Type } from '@nestjs/common';
import { AppError, ErrorHandler, GenericRoleDomain } from './../../../common';
import { GenericRole } from './entity/role.generic';
import { ServiceLogger, LoggerOptions, SearchDto } from '../../../crud/';
import type {
  IEntityMapper,
  IGenericRepository,
  IGenericService,
} from '../../../crud/interfaces';
import { GenericRoleView } from './entity/role.view';

export function GenericRoleService<
  T extends GenericRole,
  D extends GenericRoleDomain,
  V extends GenericRoleView,
  M extends IEntityMapper<T, D, V>,
  DTO extends DeepPartial<T>,
>(E: Type<T>, Mapper: Type<M>) {
  class GenericRoleService implements IGenericService<T, DTO, D, V> {
    public readonly logger: ServiceLogger;
    public readonly handler: ErrorHandler;
    public readonly mapper: M;

    constructor(readonly repository: IGenericRepository<T, DTO>) {
      this.logger = new ServiceLogger(this.constructor.name);
      this.handler = ErrorHandler.getInstance();
      this.mapper = new Mapper();
    }

    public async create(createDto: DTO): Promise<D> {
      try {
        this.logger.restart();
        const entity = await this.repository.create(createDto);
        this.logger.created(entity.id);
        const domain = this.mapper.PersistToDomain(entity);
        return domain as unknown as D;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async paginate(query: SearchDto): Promise<D[]> {
      try {
        this.logger.restart();
        const { limit, page, offset } = query;
        const entities: T[] = await this.repository.paginate(query);
        if (!entities || !entities.length) {
          return [] as unknown as D[];
        }
        const length = entities.length;
        const domains: D[] = [];
        entities.forEach((entity) => {
          const domain = this.mapper.PersistToDomain(entity);
          domains.push(domain as unknown as D);
        });
        this.logger.foundMany({ limit, page, offset, length });
        return domains;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findAll(): Promise<D[]> {
      try {
        const entities: T[] = await this.repository.findAll();
        if (!entities || !entities.length) {
          return [] as unknown as D[];
        }
        const domains: D[] = [];
        entities.forEach((entity) => {
          const domain = this.mapper.PersistToDomain(entity);
          domains.push(domain as unknown as D);
        });
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findOne(id: string, options: LoggerOptions): Promise<D> {
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
        return domain as unknown as D;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async update(entity: T, updateDto: Partial<DTO>): Promise<D> {
      try {
        this.logger.restart();
        Object.assign(entity, updateDto);
        const updatedEntity = await this.repository.update(entity, updateDto);
        this.logger.updated(updatedEntity.id);
        const domain = this.mapper.PersistToDomain(entity);
        return domain as unknown as D;
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
  return GenericRoleService;
}
