import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './role.create.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
