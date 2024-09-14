import { Injectable } from '@nestjs/common';
import { GenericService } from '@rafikidota/iroh';
import { <%= classify(name) %>Repository } from './<%= lowerCase(name) %>.repository';
import { <%= classify(name) %>Persistent } from './entities/<%= lowerCase(name) %>.entity';
import { <%= classify(name) %>Mapper } from './entities/<%= lowerCase(name) %>.mapper';

@Injectable()
export class <%= classify(name) %>Service extends GenericService(
  <%= classify(name) %>Persistent,
  <%= classify(name) %>Mapper,
) {

  constructor(readonly repository: <%= classify(name) %>Repository) {
    super(repository);
  }
}
