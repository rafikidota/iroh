import { Injectable } from '@nestjs/common';
import { GenericTypeOrmRepository } from '@rafikidota/iroh';
import { <%= classify(name) %> } from './entities/<%= lowerCase(name) %>.entity';

@Injectable()
export class <%= classify(name) %>Repository extends GenericTypeOrmRepository(<%= classify(name) %>) {}