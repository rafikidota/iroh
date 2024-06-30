import { Injectable } from '@nestjs/common';
import { GenericService } from '@rafikidota/iroh';
import { <%= classify(name) %> } from './entities/<%= lowerCase(name) %>.entity';

@Injectable()
export class <%= classify(name) %>Service extends GenericService(<%= classify(name) %>) {}
