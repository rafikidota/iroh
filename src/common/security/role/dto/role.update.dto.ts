import { PartialType } from '@nestjs/swagger';
import { CreateGenericRoleDto } from './role.create.dto';

export class UpdateGenericRoleDto extends PartialType(CreateGenericRoleDto) {}
