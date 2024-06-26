import { Injectable } from '@nestjs/common';
import { BuildGenericService } from '@rafikidota/iroh';
import { <%= classify(name) %> } from './entities/<%= lowercase(name) %>.entity';

@Injectable()
export class <%= classify(name) %>Service extends BuildGenericService(<%= classify(name) %>) {}
