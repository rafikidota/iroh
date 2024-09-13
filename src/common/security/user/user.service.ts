import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, Type } from '@nestjs/common';
import { AppError, ErrorHandler } from './../../../common';
import { GenericUser } from './entity/user.generic';
import { ServiceLogger, LoggerOptions, SearchDto } from '../../../crud/';
import type { IEntityMapper, IGenericService } from '../../../crud/interfaces';
import { GenericUserDomain } from './entity/user.domain';
import { GenericUserView } from './entity/user.view';

export function GenericUserService<
  T extends GenericUser,
  D extends GenericUserDomain,
  V extends GenericUserView,
  M extends IEntityMapper<T, D, V>,
  DTO extends DeepPartial<T>,
>(E: Type<T>, Mapper: Type<M>) {
  class GenericUserService implements IGenericService<T, DTO, D, V> {
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
        const user = this.repository.create(createDto);
        user.hashPassword();
        await this.repository.save(user);
        this.logger.created(user.id);
        const domain = this.mapper.PersistToDomain(user);
        return domain as unknown as D;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async paginate(query: SearchDto): Promise<D[]> {
      try {
        this.logger.restart();
        const { limit, page, offset } = query;
        const users = await this.repository.find();
        if (!users || !users.length) {
          return [] as unknown as D[];
        }
        const domains: D[] = [];
        users.forEach((user) => {
          const domain = this.mapper.PersistToDomain(user);
          domains.push(domain as unknown as D);
        });
        const length = users.length;
        this.logger.foundMany({ limit, page, offset, length });
        return domains;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async findAll(): Promise<D[]> {
      try {
        const users: T[] = await this.repository.find();
        if (!users || !users.length) {
          return [] as unknown as D[];
        }
        const domains: D[] = [];
        users.forEach((entity) => {
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
        return domain as unknown as D;
      } catch (error) {
        this.handler.catch(error as AppError);
      }
    }

    public async update(user: T, updateDto: Partial<DTO>): Promise<D> {
      try {
        this.logger.restart();
        Object.assign(user, updateDto);
        if (updateDto.password) {
          user.hashPassword();
        }
        const updatedEntity = await this.repository.save(user);
        this.logger.updated(updatedEntity.id);
        const domain = this.mapper.PersistToDomain(updatedEntity);
        return domain as unknown as D;
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
