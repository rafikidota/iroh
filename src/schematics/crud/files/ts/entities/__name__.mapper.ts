import { GenericEntityMapper } from '@rafikidota/iroh';
import { <%= classify(name) %> } from './<%= lowerCase(name) %>.entity';
import { <%= classify(name) %>Domain } from './<%= lowerCase(name) %>.domain';
import { <%= classify(name) %>View } from './<%= lowerCase(name) %>.view';

export class <%= classify(name) %>Mapper<
  P extends <%= classify(name) %>,
  D extends <%= classify(name) %>Domain,
  V extends <%= classify(name) %>View,
> extends GenericEntityMapper(<%= classify(name) %>, <%= classify(name) %>Domain, <%= classify(name) %>View) {
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
