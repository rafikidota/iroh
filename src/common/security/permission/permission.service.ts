import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, Type } from '@nestjs/common';
import { AppError, ErrorHandler } from '../..';
import { GenericPermission } from './entity/permission.generic';
import { GenericPermissionDomain } from './entity/permission.domain';
import { GenericPermissionView } from './entity/permission.view';
import { ServiceLogger, LoggerOptions, SearchDto } from '../../../crud';
import type { IEntityMapper, IGenericService } from '../../../crud/interfaces';

export function GenericPermissionService<
  T extends GenericPermission,
  D extends GenericPermissionDomain,
  V extends GenericPermissionView,
  M extends IEntityMapper<T, D, V>,
  DTO extends DeepPartial<T>,
>(E: Type<T>, Mapper: Type<M>) {
  class GenericPermissionService implements IGenericService<T, DTO, V> {
    public readonly logger: ServiceLogger;
    public readonly handler: ErrorHandler;
    public readonly mapper: M;
    constructor(@InjectRepository(E) readonly repository: Repository<T>) {
      const { name } = this.repository.metadata;
      const context = `${name}Logger`;
      this.logger = new ServiceLogger(context);
      this.handler = ErrorHandler.getInstance();
      this.mapper = new Mapper();
    }

    public async create(createDto: DTO): Promise<V> {
      try {
        this.logger.restart();
        const permission = this.repository.create(createDto);
        await this.repository.save(permission);
        this.logger.created(permission.id);
        const domain = this.mapper.PersistToDomain(permission);
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
        const permissions = await this.repository.find();
        if (!permissions || !permissions.length) {
          return [] as unknown as V[];
        }
        const views: V[] = [];
        permissions.forEach((permission) => {
          const domain = this.mapper.PersistToDomain(permission);
          const view = this.mapper.DomainToView(domain);
          views.push(view as unknown as V);
        });
        const length = permissions.length;
        this.logger.foundMany({ limit, page, offset, length });
        return views;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findAll(): Promise<V[]> {
      try {
        const entities: T[] = await this.repository.find();
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
        const { name } = this.repository.metadata;
        const where = { where: { id } } as unknown as FindOneOptions<T>;
        const permission = await this.repository.findOne(where);
        if (!permission) {
          this.logger.warn(`[${id}] NOT FOUND`);
          throw new NotFoundException(`${name} with id ${id} not found`);
        }
        if (options.logging) {
          this.logger.foundOne(permission.id);
        }
        const domain = this.mapper.PersistToDomain(permission);
        const view = this.mapper.DomainToView(domain);
        return view as unknown as V;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async update(permission: T, updateDto: Partial<DTO>): Promise<V> {
      try {
        this.logger.restart();
        Object.assign(permission, updateDto);
        const updatedEntity = await this.repository.save(permission);
        this.logger.updated(updatedEntity.id);
        const domain = this.mapper.PersistToDomain(updatedEntity);
        const view = this.mapper.DomainToView(domain);
        return view as unknown as V;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async remove(permission: T): Promise<void> {
      try {
        this.logger.restart();
        await this.repository.softDelete(permission.id);
        this.logger.removed(permission.id);
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }
  }
  return GenericPermissionService;
}
