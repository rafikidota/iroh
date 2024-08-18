import { Type, UseGuards, applyDecorators } from '@nestjs/common';
import { BuildRoleGuard } from '../guards';
import { GenericRole } from '../entity';

export const RoleGuard = <T extends GenericRole>(Entity: Type<T>) => {
  return applyDecorators(UseGuards(BuildRoleGuard<T>(Entity)));
};
