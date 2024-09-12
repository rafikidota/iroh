import { DeepPartial } from 'typeorm';
import { GenericDomain } from './generic.domain';
import { GenericPersistent } from './generic.persistent';
import { GenericView } from './generic.view';

export interface IEntityMapper<
  P extends GenericPersistent,
  D extends GenericDomain,
  V extends GenericView,
> {
  PersistToDomain(persistent: P): DeepPartial<D>;
  DomainToPersist(domain: D): DeepPartial<P>;
  DomainToView(domain: D): DeepPartial<V>;
}

export abstract class EntityMapper<
  P extends GenericPersistent,
  D extends GenericDomain,
  V extends GenericView,
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
