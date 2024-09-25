import { Type, UseGuards, applyDecorators } from '@nestjs/common';
import { BuildBasicAuthGuard } from '../guards';
import { GenericUser } from '../../user/entity/user.persistent';

export const BasicAuthGuard = <T extends GenericUser>(Entity: Type<T>) => {
  return applyDecorators(UseGuards(BuildBasicAuthGuard<T>(Entity)));
};
