import { UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BuildBasicAuthGuard } from '../guards';
import { AUTH_ENTITY_KEY } from './auth-entiy.decorator';

export const AuthEntityGuard =
  () => (target: unknown, key: string, descriptor: PropertyDescriptor) => {
    const reflector = new Reflector();
    const AuthEntity = reflector.get(AUTH_ENTITY_KEY, target.constructor);

    if (AuthEntity) {
      UseGuards(BuildBasicAuthGuard(AuthEntity))(target, key, descriptor);
    }

    return descriptor;
  };
