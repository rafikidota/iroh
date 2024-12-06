import { DeepPartial } from 'typeorm';
import { SearchDto } from './../../../../crud';

export type IGenericUserController<T, D> = {
  create(body: DeepPartial<D>): Promise<Partial<T>>;
  paginate(query: SearchDto): Promise<Partial<T>[]>;
  findOne(id: string): Promise<Partial<T>>;
  update(entity: T, body: Partial<D>): Promise<Partial<T>>;
  remove(entity: T): Promise<void>;
};
