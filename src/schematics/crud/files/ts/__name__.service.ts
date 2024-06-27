import { Injectable } from '@nestjs/common';
import { BuildGenericService } from '@rafikidota/iroh';
import { <%= classify(name) %> } from './entities/<%= lowerCase(name) %>.entity';

@Injectable()
export class <%= classify(name) %>Service extends BuildGenericService(<%= classify(name) %>) {}
