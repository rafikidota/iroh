import { Injectable } from '@nestjs/common';
import { GenericService } from '@rafikidota/iroh';
import { <%= classify(name) %>Repository } from './infra/<%= lowerCase(name) %>.repository';
import { <%= classify(name) %>Persistent } from './infra/<%= lowerCase(name) %>.persistent';
import { <%= classify(name) %>Mapper } from './infra/<%= lowerCase(name) %>.mapper';

@Injectable()
export class <%= classify(name) %>Service extends GenericService(
  <%= classify(name) %>Persistent,
  <%= classify(name) %>Mapper,
) {
  constructor(readonly repository: <%= classify(name) %>Repository) {
    super(repository);
  }
}
