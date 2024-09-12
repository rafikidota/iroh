import type { IEntityMapper } from '../../../../crud/mapper';
import { DeepPartial } from 'typeorm';
import { GenericRole } from './role.generic';
import { GenericRoleDomain } from './role.domain';
import { GenericRoleView } from './role.view';

export abstract class RoleMapper<
  P extends GenericRole,
  D extends GenericRoleDomain,
  V extends GenericRoleView,
> implements IEntityMapper<P, D, V>
{
  PersistToDomain(persistent: P): DeepPartial<D> {
    const domain = { ...persistent } as unknown as D;
    return domain;
  }

  DomainToPersist(domain: DeepPartial<D>): DeepPartial<P> {
    const persistent = { ...domain } as unknown as P;
    return persistent;
  }

  DomainToView(domain: DeepPartial<D>): DeepPartial<V> {
    const view = { ...domain } as unknown as V;
    return view;
  }
}
