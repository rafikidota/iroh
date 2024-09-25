import { Type } from '@nestjs/common';
import type { IEntityMapper } from '../../../../crud/interfaces';
import { GenericUser } from './user.persistent';
import { GenericUserDomain } from './user.domain';
import { GenericUserView } from './user.view';

export function GenericUserMapper<
  T extends GenericUser,
  D extends GenericUserDomain,
  V extends GenericUserView,
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
