import { DeepPartial } from 'typeorm';
import type { IEntityMapper } from '../../../../crud/mapper';
import { GenericUser } from './user.generic';
import { GenericUserDomain } from './user.domain';
import { GenericUserView } from './user.view';

export abstract class GenericUserMapper<
  P extends GenericUser,
  D extends GenericUserDomain,
  V extends GenericUserView,
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
