import { Type, UseGuards, applyDecorators } from '@nestjs/common';
import { BuildEntityGuard } from '../guards/entity.guard';

export const EntityGuard = <T>(Entity: Type<T>) => {
  return applyDecorators(UseGuards(BuildEntityGuard<T>(Entity)));
};
