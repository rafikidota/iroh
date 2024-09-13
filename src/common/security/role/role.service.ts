import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, Type } from '@nestjs/common';
import { AppError, ErrorHandler, GenericRoleDomain } from './../../../common';
import { GenericRole } from './entity/role.generic';
import { ServiceLogger, LoggerOptions, SearchDto } from '../../../crud/';
import type { IEntityMapper, IGenericService } from '../../../crud/interfaces';
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

    constructor(@InjectRepository(E) readonly repository: Repository<T>) {
      const { name } = this.repository.metadata;
      const context = `${name}Logger`;
      this.logger = new ServiceLogger(context);
      this.handler = ErrorHandler.getInstance();
      this.mapper = new Mapper();
    }

    public async create(createDto: DTO): Promise<D> {
      try {
        this.logger.restart();
        const role = this.repository.create(createDto);
        await this.repository.save(role);
        this.logger.created(role.id);
        const domain = this.mapper.PersistToDomain(role);
        return domain as unknown as D;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async paginate(query: SearchDto): Promise<D[]> {
      try {
        this.logger.restart();
        const { limit, page, offset } = query;
        const roles = await this.repository.find();
        if (!roles || !roles.length) {
          return [] as unknown as D[];
        }
        const domains: D[] = [];
        roles.forEach((role) => {
          const domain = this.mapper.PersistToDomain(role);
          domains.push(domain as unknown as D);
        });
        const length = roles.length;
        this.logger.foundMany({ limit, page, offset, length });
        return domains;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findAll(): Promise<D[]> {
      try {
        const roles: T[] = await this.repository.find();
        if (!roles || !roles.length) {
          return [] as unknown as D[];
        }
        const views: D[] = [];
        roles.forEach((entity) => {
          const domain = this.mapper.PersistToDomain(entity);
          views.push(domain as unknown as D);
        });
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findOne(id: string, options: LoggerOptions): Promise<D> {
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
        return domain as unknown as D;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async update(role: T, updateDto: Partial<DTO>): Promise<D> {
      try {
        this.logger.restart();
        Object.assign(role, updateDto);
        const updatedEntity = await this.repository.save(role);
        this.logger.updated(updatedEntity.id);
        const domain = this.mapper.PersistToDomain(updatedEntity);
        return domain as unknown as D;
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
