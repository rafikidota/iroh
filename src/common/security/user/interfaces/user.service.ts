import { DeepPartial } from 'typeorm';
import { SearchDto, LoggerOptions } from './../../../../crud';

export type IGenericUserService<T, D> = {
  create(createDto: DeepPartial<D>): Promise<T>;
  paginate(query: SearchDto): Promise<T[]>;
  findAll(): Promise<T[]>;
  findOne(id: string, options: LoggerOptions): Promise<T>;
  update(user: T, updateDto: Partial<D>): Promise<T>;
  remove(user: T): Promise<void>;
};
