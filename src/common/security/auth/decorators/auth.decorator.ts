import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards';

export function AuthGuard() {
  return applyDecorators(UseGuards(JwtAuthGuard()));
}
