import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, Type } from '@nestjs/common';
import { AppError, ErrorHandler } from './../../../common';
import { GenericUser } from './entity/user.generic';
import { ServiceLogger, LoggerOptions, SearchDto } from '../../../crud/';
import type { IGenericService } from '../../../crud/interfaces';

export function GenericUserService<
  T extends GenericUser,
  D extends DeepPartial<T>,
>(E: Type<T>) {
  class GenericUserService implements IGenericService<T, D> {
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
        const user = this.repository.create(createDto);
        user.hashPassword();
        await this.repository.save(user);
        this.logger.created(user.id);
        return user as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async paginate(query: SearchDto): Promise<T[]> {
      try {
        this.logger.restart();
        const { limit, page, offset } = query;
        const users = await this.repository.find();
        const length = users.length;
        this.logger.foundMany({ limit, page, offset, length });
        return users;
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
        const user = await this.repository.findOne(where);
        if (!user) {
          this.logger.warn(`[${id}] NOT FOUND`);
          throw new NotFoundException(`${name} with id ${id} not found`);
        }
        if (options.logging) {
          this.logger.foundOne(user.id);
        }
        return user as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async update(user: T, updateDto: Partial<D>): Promise<T> {
      try {
        this.logger.restart();
        Object.assign(user, updateDto);
        if (updateDto.password) {
          user.hashPassword();
        }
        const updatedEntity = await this.repository.save(user);
        this.logger.updated(updatedEntity.id);
        return updatedEntity as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async remove(user: T): Promise<void> {
      try {
        this.logger.restart();
        await this.repository.softDelete(user.id);
        this.logger.removed(user.id);
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }
  }
  return GenericUserService;
}
