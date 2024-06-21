import { DeepPartial } from 'typeorm';
import { SearchPaginateDto } from '../dto';

export type IGenericController<T, D> = {
  create(body: DeepPartial<D>): Promise<Partial<T>>;
  paginate(query: SearchPaginateDto): Promise<Partial<T>[]>;
  findOne(id: string): Promise<Partial<T>>;
  update(entity: T, body: Partial<D>): Promise<Partial<T>>;
  remove(entity: T): Promise<void>;
};
