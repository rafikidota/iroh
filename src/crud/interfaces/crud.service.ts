import { DeepPartial } from 'typeorm';
import { SearchDto } from '../dto';
import { LoggerOptions } from '../logger';

export type IGenericService<T, D> = {
  create(createDto: DeepPartial<D>): Promise<T>;
  paginate(query: SearchDto): Promise<T[]>;
  findAll(): Promise<T[]>;
  findOne(id: string, options: LoggerOptions): Promise<T>;
  update(entity: T, updateDto: Partial<D>): Promise<T>;
  remove(entity: T): Promise<void>;
};
