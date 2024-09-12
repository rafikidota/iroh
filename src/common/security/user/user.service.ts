import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, Type } from '@nestjs/common';
import { AppError, ErrorHandler } from './../../../common';
import { GenericUser } from './entity/user.generic';
import { ServiceLogger, LoggerOptions, SearchDto } from '../../../crud/';
import type { IGenericService } from '../../../crud/interfaces';
import { GenericUserDomain } from './entity/user.domain';
import { GenericUserView } from './entity/user.view';
import { EntityMapper } from '../../../crud/mapper';

export function GenericUserService<
  T extends GenericUser,
  D extends GenericUserDomain,
  V extends GenericUserView,
  M extends EntityMapper<T, D, V>,
  DTO extends DeepPartial<T>,
>(E: Type<T>, Mapper: Type<M>) {
  class GenericUserService implements IGenericService<T, DTO, V> {
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
        const user = this.repository.create(createDto);
        user.hashPassword();
        await this.repository.save(user);
        this.logger.created(user.id);
        const domain = this.mapper.PersistToDomain(user);
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
        const users = await this.repository.find();
        if (!users || !users.length) {
          return [] as unknown as V[];
        }
        const views: V[] = [];
        users.forEach((user) => {
          const domain = this.mapper.PersistToDomain(user);
          const view = this.mapper.DomainToView(domain);
          views.push(view as unknown as V);
        });
        const length = users.length;
        this.logger.foundMany({ limit, page, offset, length });
        return views;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findAll(): Promise<V[]> {
      try {
        const users: T[] = await this.repository.find();
        if (!users || !users.length) {
          return [] as unknown as V[];
        }
        const views: V[] = [];
        users.forEach((entity) => {
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
        const user = await this.repository.findOne(where);
        if (!user) {
          this.logger.warn(`[${id}] NOT FOUND`);
          throw new NotFoundException(`${name} with id ${id} not found`);
        }
        if (options.logging) {
          this.logger.foundOne(user.id);
        }
        const domain = this.mapper.PersistToDomain(user);
        const view = this.mapper.DomainToView(domain);
        return view as unknown as V;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async update(user: T, updateDto: Partial<DTO>): Promise<V> {
      try {
        this.logger.restart();
        Object.assign(user, updateDto);
        if (updateDto.password) {
          user.hashPassword();
        }
        const updatedEntity = await this.repository.save(user);
        this.logger.updated(updatedEntity.id);
        const domain = this.mapper.PersistToDomain(updatedEntity);
        const view = this.mapper.DomainToView(domain);
        return view as unknown as V;
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
