import { DeepPartial } from 'typeorm';
import { SearchDto } from '../dto';

export type IGenericController<T, D, V> = {
  create(body: DeepPartial<D>): Promise<Partial<V>>;
  paginate(query: SearchDto): Promise<Partial<V>[]>;
  findOne(id: string): Promise<Partial<V>>;
  update(entity: T, body: Partial<D>): Promise<Partial<V>>;
  remove(entity: T): Promise<void>;
};
