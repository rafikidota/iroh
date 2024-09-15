import { GenericUserMapper, IEntityMapper } from '@rafikidota/iroh';
import { UserPersistent } from '../infra/user.persistent';
import { UserDomain } from '../domain/user.domain';
import { UserView } from '../infra/user.view';

export class UserMapper
  extends GenericUserMapper(UserPersistent, UserDomain, UserView)
  implements IEntityMapper<UserPersistent, UserDomain, UserView>
{
  PersistToDomain(persistent: UserPersistent): UserDomain {
    return new UserDomain(persistent);
  }

  DomainToPersist(domain: UserDomain): UserPersistent {
    const persistent = {
      id: domain.id,
      name: domain.name,
      lastName: domain.lastName,
      username: domain.username,
      email: domain.email,
      password: domain.password,
      type: domain.type,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt,
    } as unknown as UserPersistent;
    return persistent;
  }

  DomainToView(domain: UserDomain): UserView {
    return new UserView(domain);
  }
}
