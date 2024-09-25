import { PartialType } from '@nestjs/swagger';
import { CreateGenericPermissionDto } from './permission.create.dto';

export class UpdateGenericPermissionDto extends PartialType(
  CreateGenericPermissionDto,
) {}
