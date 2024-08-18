import { Type, UseGuards, applyDecorators } from '@nestjs/common';
import { BuildPermissionGuard } from '../guards';
import { GenericPermission } from '../entity';

export const PermissionGuard = <T extends GenericPermission>(
  Entity: Type<T>,
) => {
  return applyDecorators(UseGuards(BuildPermissionGuard<T>(Entity)));
};
