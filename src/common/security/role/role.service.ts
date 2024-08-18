import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, Type } from '@nestjs/common';
import { AppError, ErrorHandler } from './../../../common';
import { GenericRole } from './entity/role.generic';
import { ServiceLogger, LoggerOptions, SearchDto } from '../../../crud/';
import type { IGenericService } from '../../../crud/interfaces';

export function GenericRoleService<
  T extends GenericRole,
  D extends DeepPartial<T>,
>(E: Type<T>) {
  class GenericRoleService implements IGenericService<T, D> {
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
        const role = this.repository.create(createDto);
        await this.repository.save(role);
        this.logger.created(role.id);
        return role as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async paginate(query: SearchDto): Promise<T[]> {
      try {
        this.logger.restart();
        const { limit, page, offset } = query;
        const roles = await this.repository.find();
        const length = roles.length;
        this.logger.foundMany({ limit, page, offset, length });
        return roles;
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
        const role = await this.repository.findOne(where);
        if (!role) {
          this.logger.warn(`[${id}] NOT FOUND`);
          throw new NotFoundException(`${name} with id ${id} not found`);
        }
        if (options.logging) {
          this.logger.foundOne(role.id);
        }
        return role as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async update(role: T, updateDto: Partial<D>): Promise<T> {
      try {
        this.logger.restart();
        Object.assign(role, updateDto);
        const updatedEntity = await this.repository.save(role);
        this.logger.updated(updatedEntity.id);
        return updatedEntity as unknown as T;
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
