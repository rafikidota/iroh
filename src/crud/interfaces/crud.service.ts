import { DeepPartial } from 'typeorm';
import { SearchDto } from '../dto';
import { LoggerOptions } from '../logger';

export type IGenericService<T, D, V> = {
  create(createDto: DeepPartial<D>): Promise<V>;
  paginate(query: SearchDto): Promise<V[]>;
  findAll(): Promise<V[]>;
  findOne(id: string, options: LoggerOptions): Promise<V>;
  update(entity: T, updateDto: Partial<D>): Promise<V>;
  remove(entity: T): Promise<void>;
};
