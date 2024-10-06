import { Type } from '@nestjs/common';
import type { IEntityMapper } from '../../../../crud/interfaces';
import { GenericPermission } from './permission.persistent';
import { GenericPermissionDomain } from './permission.domain';
import { GenericPermissionView } from './permission.view';

export function GenericPermissionMapper<
  T extends GenericPermission,
  D extends GenericPermissionDomain,
  V extends GenericPermissionView,
>(Persistent: Type<T>, Domain: Type<D>, View: Type<V>) {
  class EntityMapper implements IEntityMapper<T, D, V> {
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
