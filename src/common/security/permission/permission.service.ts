import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, Type } from '@nestjs/common';
import { AppError, ErrorHandler } from '../..';
import { GenericPermission } from './entity/permission.generic';
import { ServiceLogger, LoggerOptions, SearchDto } from '../../../crud';
import type { IGenericService } from '../../../crud/interfaces';

export function GenericPermissionService<
  T extends GenericPermission,
  D extends DeepPartial<T>,
>(E: Type<T>) {
  class GenericPermissionService implements IGenericService<T, D> {
    public readonly logger: ServiceLogger;
    public readonly handler: ErrorHandler;
    constructor(@InjectRepository(E) readonly repository: Repository<T>) {
      const { name } = this.repository.metadata;
      const context = `${name}Logger`;
      this.logger = new ServiceLogger(context);
      this.handler = ErrorHandler.getInstance();
    }

    public async create(createDto: D): Promise<T> {
      try {
        this.logger.restart();
        const permission = this.repository.create(createDto);
        await this.repository.save(permission);
        this.logger.created(permission.id);
        return permission as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async paginate(query: SearchDto): Promise<T[]> {
      try {
        this.logger.restart();
        const { limit, page, offset } = query;
        const permissions = await this.repository.find();
        const length = permissions.length;
        this.logger.foundMany({ limit, page, offset, length });
        return permissions;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findAll() {
      try {
        return await this.repository.find();
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findOne(id: string, options: LoggerOptions): Promise<T> {
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
        return permission as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async update(permission: T, updateDto: Partial<D>): Promise<T> {
      try {
        this.logger.restart();
        Object.assign(permission, updateDto);
        const updatedEntity = await this.repository.save(permission);
        this.logger.updated(updatedEntity.id);
        return updatedEntity as unknown as T;
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
