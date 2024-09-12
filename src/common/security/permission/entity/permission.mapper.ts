import type { IEntityMapper } from '../../../../crud/mapper';
import { DeepPartial } from 'typeorm';
import { GenericPermission } from './permission.generic';
import { GenericPermissionDomain } from './permission.domain';
import { GenericPermissionView } from './permission.view';

export abstract class GenericPermissionMapper<
  P extends GenericPermission,
  D extends GenericPermissionDomain,
  V extends GenericPermissionView,
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
