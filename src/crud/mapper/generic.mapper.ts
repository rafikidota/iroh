import { Type } from '@nestjs/common';
import { IGenericDomain } from './generic.domain';
import { GenericPersistent } from './generic.persistent';
import { IGenericView } from './generic.view';
import type { IEntityMapper } from '../interfaces/generic.mapper';

export function GenericEntityMapper<
  T extends GenericPersistent,
  D extends IGenericDomain,
  V extends IGenericView,
>(Persistent: Type<T>, Domain: Type<D>, View: Type<V>) {
  abstract class EntityMapper implements IEntityMapper<T, D, V> {
    PersistToDomain(persistent: T): D {
      return new Domain({ ...persistent }) as D;
    }

    DomainToPersist(domain: D): T {
      return new Persistent({ ...domain }) as T;
    }

    DomainToView(domain: D): V {
      return new View({ ...domain }) as V;
    }
  }
  return EntityMapper;
}
