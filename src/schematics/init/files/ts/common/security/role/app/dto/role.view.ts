import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { GenericRoleView } from '@rafikidota/iroh';
import { CreateRoleDto } from './role.create.dto';
import { RoleDomain } from '../../domain/role.domain';

export class RoleView extends OmitType(
  IntersectionType(PartialType(CreateRoleDto), GenericRoleView),
  [],
) {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(domain: RoleDomain) {
    super(domain);
    this.id = domain.id;
    this.name = domain.name;
    this.description = domain.description;
    this.createdAt = domain.createdAt;
    this.updatedAt = domain.updatedAt;
  }
}
