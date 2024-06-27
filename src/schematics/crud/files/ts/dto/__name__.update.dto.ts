import { PartialType } from '@nestjs/swagger';
import { Create<%= classify(name) %>Dto } from './create-<%= lowerCase(name) %>.dto';

export class Update<%= classify(name) %>Dto extends PartialType(Create<%= classify(name) %>Dto) {}
