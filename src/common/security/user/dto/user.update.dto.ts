import { PartialType } from '@nestjs/swagger';
import { CreateGenericUserDto } from './user.create.dto';

export class UpdateGenericUserDto extends PartialType(CreateGenericUserDto) {}
