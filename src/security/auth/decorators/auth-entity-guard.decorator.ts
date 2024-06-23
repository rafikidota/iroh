import {
  UseGuards,
  Type,
  Injectable,
  mixin,
  ExecutionContext,
  applyDecorators,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GenericUser } from './../../user/entity/user.generic';
import { BuildBasicAuthGuard } from '../guards';
import { AUTH_ENTITY_KEY } from './auth-entiy.decorator';

export function AuthEntityGuard<T extends GenericUser>() {
  @Injectable()
  class MixinAuthGuard {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
      const target = context.getHandler();
      const AuthEntity = this.reflector.get<Type<T>>(
        AUTH_ENTITY_KEY,
        target.constructor,
      );

      if (AuthEntity) {
        return applyDecorators(UseGuards(BuildBasicAuthGuard<T>(AuthEntity)));
      }
    }
  }

  return UseGuards(mixin(MixinAuthGuard));
}
