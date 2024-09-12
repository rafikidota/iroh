import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, Type } from '@nestjs/common';
import { AppError, ErrorHandler, GenericRoleDomain } from './../../../common';
import { GenericRole } from './entity/role.generic';
import {
  ServiceLogger,
  LoggerOptions,
  SearchDto,
  EntityMapper,
} from '../../../crud/';
import type { IGenericService } from '../../../crud/interfaces';
import { GenericRoleView } from './entity/role.view';

export function GenericRoleService<
  T extends GenericRole,
  D extends GenericRoleDomain,
  V extends GenericRoleView,
  M extends EntityMapper<T, D, V>,
  DTO extends DeepPartial<T>,
>(E: Type<T>, Mapper: Type<M>) {
  class GenericRoleService implements IGenericService<T, DTO, V> {
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
        const role = this.repository.create(createDto);
        await this.repository.save(role);
        this.logger.created(role.id);
        const domain = this.mapper.PersistToDomain(role);
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
        const roles = await this.repository.find();
        if (!roles || !roles.length) {
          return [] as unknown as V[];
        }
        const views: V[] = [];
        roles.forEach((role) => {
          const domain = this.mapper.PersistToDomain(role);
          const view = this.mapper.DomainToView(domain);
          views.push(view as unknown as V);
        });
        const length = roles.length;
        this.logger.foundMany({ limit, page, offset, length });
        return views;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findAll(): Promise<V[]> {
      try {
        const roles: T[] = await this.repository.find();
        if (!roles || !roles.length) {
          return [] as unknown as V[];
        }
        const views: V[] = [];
        roles.forEach((entity) => {
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
        const role = await this.repository.findOne(where);
        if (!role) {
          this.logger.warn(`[${id}] NOT FOUND`);
          throw new NotFoundException(`${name} with id ${id} not found`);
        }
        if (options.logging) {
          this.logger.foundOne(role.id);
        }
        const domain = this.mapper.PersistToDomain(role);
        const view = this.mapper.DomainToView(domain);
        return view as unknown as V;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async update(role: T, updateDto: Partial<DTO>): Promise<V> {
      try {
        this.logger.restart();
        Object.assign(role, updateDto);
        const updatedEntity = await this.repository.save(role);
        this.logger.updated(updatedEntity.id);
        const domain = this.mapper.PersistToDomain(updatedEntity);
        const view = this.mapper.DomainToView(domain);
        return view as unknown as V;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async remove(role: T): Promise<void> {
      try {
        this.logger.restart();
        await this.repository.softDelete(role.id);
        this.logger.removed(role.id);
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }
  }
  return GenericRoleService;
}
