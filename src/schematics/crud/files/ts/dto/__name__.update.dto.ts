import { PartialType } from '@nestjs/swagger';
import { Create<%= classify(name) %>Dto } from './create-<%= lowercase(name) %>.dto';

export class Update<%= classify(name) %>Dto extends PartialType(Create<%= classify(name) %>Dto) {}
