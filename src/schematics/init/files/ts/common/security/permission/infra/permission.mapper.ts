import { GenericPermissionMapper, IEntityMapper } from '@rafikidota/iroh';
import { PermissionPersistent } from './permission.persistent';
import { PermissionDomain } from '../domain/permission.domain';
import { PermissionView } from '../app/dto/permission.view';

export class PermissionMapper
  extends GenericPermissionMapper(
    PermissionPersistent,
    PermissionDomain,
    PermissionView,
  )
  implements
    IEntityMapper<PermissionPersistent, PermissionDomain, PermissionView>
{
  PersistToDomain(persistent: PermissionPersistent): PermissionDomain {
    return new PermissionDomain(persistent);
  }

  DomainToPersist(domain: PermissionDomain): PermissionPersistent {
    const persistent = {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      method: domain.method,
      code: domain.code,
      path: domain.path,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt,
    } as unknown as PermissionPersistent;
    return persistent;
  }

  DomainToView(domain: PermissionDomain): PermissionView {
    return new PermissionView(domain);
  }
}
