import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { GenericPermissionView, PermissionMethodEnumType } from '@rafikidota/iroh';
import { CreatePermissionDto } from '../app/dto';
import { PermissionDomain } from '../domain/permission.domain';

export class PermissionView extends OmitType(
  IntersectionType(PartialType(CreatePermissionDto), GenericPermissionView),
  [],
) {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  method: PermissionMethodEnumType;
  @ApiProperty()
  code: string;
  @ApiProperty()
  path: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(domain: PermissionDomain) {
    super(domain);
    this.id = domain.id;
    this.name = domain.name;
    this.description = domain.description;
    this.method = domain.method;
    this.code = domain.code;
    this.path = domain.path;
    this.createdAt = domain.createdAt;
    this.updatedAt = domain.updatedAt;
  }
}
