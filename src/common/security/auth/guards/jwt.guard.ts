import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function JwtAuthGuard() {
  @Injectable()
  class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      Object.assign(request, { startTime: Date.now() });
      return super.canActivate(context) as boolean;
    }
  }
  return new JwtAuthGuard();
}
