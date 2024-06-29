import {
  Injectable,
  ExecutionContext,
  applyDecorators,
  UseGuards,
  SetMetadata,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GenericUser } from './../../user/entity/user.generic';
import { BuildBasicAuthGuard } from '../guards';
import { AUTH_ENTITY_KEY } from './auth-entiy.decorator';

@Injectable()
class MixinAuthGuard {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const target = context.getClass();
    const AuthEntity = this.reflector.get(AUTH_ENTITY_KEY, target);

    if (AuthEntity) {
      return true;
    }
    return false;
  }
}

export function AuthEntityGuard<T extends GenericUser>(entity: Type<T>) {
  return applyDecorators(
    SetMetadata(AUTH_ENTITY_KEY, entity),
    UseGuards(BuildBasicAuthGuard<T>(entity), MixinAuthGuard),
  );
}
