import { GenericUserMapper } from '@rafikidota/iroh';
import { User } from './user.entity';
import { UserDomain } from './user.domain';
import { UserView } from './user.view';

export class UserMapper<
  P extends User,
  D extends UserDomain,
  V extends UserView,
> extends GenericUserMapper(User, UserDomain, UserView) {
  PersistToDomain(persistent: P): D {
    const domain = { ...persistent } as unknown as D;
    return domain;
  }

  DomainToPersist(domain: D): P {
    const persistent = { ...domain } as unknown as P;
    return persistent;
  }

  DomainToView(domain: D): V {
    const view = { ...domain } as unknown as V;
    return view;
  }
}
