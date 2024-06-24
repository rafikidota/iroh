import { applyDecorators, Type, UseGuards } from '@nestjs/common';
import { GenericUser } from './../../user/entity/user.generic';
import { BuildBasicAuthGuard } from '../guards';

export const AUTH_ENTITY_KEY = 'AuthEntity';

export function AuthEntity<T extends GenericUser>(entity: Type<T>) {
  return applyDecorators(UseGuards(BuildBasicAuthGuard(entity)));
}
