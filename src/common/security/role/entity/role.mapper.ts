import { Type } from '@nestjs/common';
import { GenericRole } from './role.generic';
import { GenericRoleDomain } from './role.domain';
import { GenericRoleView } from './role.view';
import type { IEntityMapper } from '../../../../crud/interfaces';

export function GenericRoleMapper<
  T extends GenericRole,
  D extends GenericRoleDomain,
  V extends GenericRoleView,
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
