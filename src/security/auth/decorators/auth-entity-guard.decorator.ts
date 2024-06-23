import { UseGuards, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GenericUser } from './../../user/entity/user.generic';
import { BuildBasicAuthGuard } from '../guards';
import { AUTH_ENTITY_KEY } from './auth-entiy.decorator';

export const AuthEntityGuard = <T extends GenericUser>() => {
  return (target: unknown, key: string, descriptor: PropertyDescriptor) => {
    const reflector = new Reflector();
    const AuthEntity = reflector.get<Type<T>>(
      AUTH_ENTITY_KEY,
      target.constructor,
    );
    if (AuthEntity) {
      UseGuards(BuildBasicAuthGuard(AuthEntity))(target, key, descriptor);
    }

    return descriptor;
  };
};
