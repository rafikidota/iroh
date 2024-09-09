import { Type, UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from '../guards';
import { GenericPermission, BuildPermissionGuard } from './../../permission/';

export const SecurityGuard = <T extends GenericPermission>(
  Entity?: Type<T>,
) => {
  if (Entity) {
    return applyDecorators(
      UseGuards(JwtAuthGuard(), BuildPermissionGuard<T>(Entity)),
    );
  }
  return applyDecorators(UseGuards(JwtAuthGuard()));
};
