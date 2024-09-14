import { GenericEntityMapper, IEntityMapper } from '@rafikidota/iroh';
import { <%= classify(name) %>Persistent } from './<%= lowerCase(name) %>.persistent';
import { <%= classify(name) %>Domain } from '../domain/<%= lowerCase(name) %>.domain';
import { <%= classify(name) %>View } from './<%= lowerCase(name) %>.view';

export class <%= classify(name) %>Mapper
  extends GenericEntityMapper(<%= classify(name) %>Persistent, <%= classify(name) %>Domain, <%= classify(name) %>View)
  implements IEntityMapper<<%= classify(name) %>Persistent, <%= classify(name) %>Domain, <%= classify(name) %>View>
{
  PersistToDomain(persistent: <%= classify(name) %>Persistent): <%= classify(name) %>Domain {
    return new <%= classify(name) %>Domain(persistent);
  }

  DomainToPersist(domain: <%= classify(name) %>Domain): <%= classify(name) %>Persistent {
    const persistent = {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt,
    } as unknown as <%= classify(name) %>Persistent;
    return persistent;
  }

  DomainToView(domain: <%= classify(name) %>Domain): <%= classify(name) %>View {
    return new <%= classify(name) %>View(domain);
  }
}
