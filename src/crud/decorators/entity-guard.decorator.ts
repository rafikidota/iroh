import { UseGuards } from '@nestjs/common';
import { BuildEntityGuard } from '../guards/entity.guard';

export function UseEntityGuard<T>() {
  return UseGuards(BuildEntityGuard<T>);
}
