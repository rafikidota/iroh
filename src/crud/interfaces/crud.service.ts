import { DeepPartial } from 'typeorm';
import { SearchDto } from '../dto';
import { LoggerOptions } from '../logger';
import { IEntityMapper } from './generic.mapper';
import { GenericPersistent, GenericDomain, GenericView } from '../mapper';

export type IGenericService<
  T extends GenericPersistent,
  DTO,
  D extends GenericDomain,
  V extends GenericView,
> = {
  mapper: IEntityMapper<T, D, V>;
  create(createDto: DeepPartial<DTO>): Promise<D>;
  paginate(query: SearchDto): Promise<D[]>;
  findAll(): Promise<D[]>;
  findOne(id: string, options: LoggerOptions): Promise<D>;
  update(entity: T, updateDto: Partial<DTO>): Promise<D>;
  remove(entity: T): Promise<void>;
};
