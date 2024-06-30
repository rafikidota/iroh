import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, Type } from '@nestjs/common';
import { AppError, ErrorHandler } from './../../../common';
import { GenericUser } from './entity/user.generic';
import {
  GenericLogger,
  LoggerOptions,
  SearchPaginateDto,
} from '../../../crud/';
import type { IGenericService } from '../../../crud/interfaces';

export function GenericUserService<
  T extends GenericUser,
  D extends DeepPartial<T>,
>(E: Type<T>) {
  class GenericUserService implements IGenericService<T, D> {
    constructor(
      @InjectRepository(E) readonly repository: Repository<T>,
      readonly logger: GenericLogger,
      readonly handler: ErrorHandler,
    ) {
      const { name } = this.repository.metadata;
      const context = `${name}Logger`;
      this.logger = new GenericLogger(context);
    }

    public async create(createDto: D): Promise<T> {
      try {
        this.logger.restart();
        const user = this.repository.create(createDto);
        user.hashPassword();
        await this.repository.save(user);
        this.logger.post(`[${user.id}]`);
        return user as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async paginate(query: SearchPaginateDto): Promise<T[]> {
      try {
        this.logger.restart();
        const { limit, page } = query;
        const users = await this.repository.find();
        this.logger.get(`${JSON.stringify({ limit, page })}`);
        return users;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findAll() {
      try {
        this.logger.restart();
        const users = await this.repository.find();
        this.logger.get(`find all`);
        return users;
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
          this.logger.get(`[${user.id}]`);
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
        this.logger.patch(`[${updatedEntity.id}]`);
        return updatedEntity as unknown as T;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async remove(user: T): Promise<void> {
      try {
        const { id } = user;
        this.logger.restart();
        await this.repository.softDelete(id);
        this.logger.delete(`[${id}]`);
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }
  }
  return GenericUserService;
}
