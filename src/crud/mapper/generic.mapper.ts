import { DeepPartial } from 'typeorm';
import { GenericDomain } from './generic.domain';
import { GenericPersistent } from './generic.persistent';
import { GenericView } from './generic.view';

export interface IEntityMapper<
  D extends GenericDomain,
  P extends GenericPersistent,
  V extends GenericView,
> {
  PersistToDomain(persistent: P): DeepPartial<D>;
  DomainToPersist(domain: D): DeepPartial<P>;
  DomainToView(domain: D): DeepPartial<V>;
}

export abstract class EntityMapper<
  D extends GenericDomain,
  P extends GenericPersistent,
  V extends GenericView,
> implements IEntityMapper<D, P, V>
{
  PersistToDomain(persistent: P): DeepPartial<D> {
    const domain = { ...persistent } as unknown as D;
    return domain;
  }

  DomainToPersist(domain: D): DeepPartial<P> {
    const persistent = { ...domain } as unknown as P;
    return persistent;
  }

  DomainToView(domain: D): DeepPartial<V> {
    const view = { ...domain } as unknown as V;
    return view;
  }
}
