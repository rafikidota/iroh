import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PublicKey } from '../decorators';

export function JwtAuthGuard() {
  @Injectable()
  class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(readonly reflector: Reflector) {
      super();
    }
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      if (!request.startTime) {
        request.startTime = Date.now();
      }
      const constexHandler = context.getHandler();
      const contextClass = context.getClass();
      const ok = this.reflector.getAllAndOverride<boolean>(PublicKey, [
        constexHandler,
        contextClass,
      ]);

      if (ok) {
        return true;
      }
      return super.canActivate(context) as boolean;
    }
  }
  return JwtAuthGuard;
}
