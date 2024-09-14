import { Injectable } from '@nestjs/common';
import { GenericTypeOrmRepository } from '@rafikidota/iroh';
import { <%= classify(name) %>Persistent } from './<%= lowerCase(name) %>.persistent';

@Injectable()
export class <%= classify(name) %>Repository extends GenericTypeOrmRepository(<%= classify(name) %>Persistent) {}
