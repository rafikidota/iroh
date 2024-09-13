import { GenericPersistent } from './../mapper/generic.persistent';
import { GenericDomain } from '../mapper/generic.domain';
import { GenericView } from '../mapper/generic.view';

export interface IEntityMapper<
  P extends GenericPersistent,
  D extends GenericDomain,
  V extends GenericView,
> {
  PersistToDomain(persistent: P): D;
  DomainToPersist(domain: D): P;
  DomainToView(domain: D): V;
}
