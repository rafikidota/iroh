import { Injectable } from '@nestjs/common';
import { GenericRepository } from '@rafikidota/iroh';
import { <%= classify(name) %> } from './entities/<%= lowerCase(name) %>.entity';

@Injectable()
export class <%= classify(name) %>Repository extends GenericRepository(<%= classify(name) %>) {}
