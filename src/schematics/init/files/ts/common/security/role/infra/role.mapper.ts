import { GenericRoleMapper, IEntityMapper } from '@rafikidota/iroh';
import { RolePersistent } from './role.persistent';
import { RoleDomain } from '../domain/role.domain';
import { RoleView } from '../app/dto/role.view';

export class RoleMapper
  extends GenericRoleMapper(RolePersistent, RoleDomain, RoleView)
  implements IEntityMapper<RolePersistent, RoleDomain, RoleView>
{
  PersistToDomain(persistent: RolePersistent): RoleDomain {
    return new RoleDomain(persistent);
  }

  DomainToPersist(domain: RoleDomain): RolePersistent {
    const persistent = {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt,
    } as unknown as RolePersistent;
    return persistent;
  }

  DomainToView(domain: RoleDomain): RoleView {
    return new RoleView(domain);
  }
}
