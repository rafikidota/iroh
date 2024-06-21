import { DeepPartial } from 'typeorm';
import { LoggerOptions, SearchPaginateDto } from '../crud';

export interface IGenericService<T, D> {
  create(createDto: DeepPartial<D>): Promise<T>;
  paginate(query: SearchPaginateDto): Promise<T[]>;
  findAll(): Promise<T[]>;
  findOne(id: string, options: LoggerOptions): Promise<T>;
  update(entity: T, updateDto: Partial<D>): Promise<T>;
  remove(entity: T): Promise<void>;
}
