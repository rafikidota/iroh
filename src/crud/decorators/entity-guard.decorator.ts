import { UseGuards, Type } from '@nestjs/common';
import { BuildEntityGuard } from '../guards/entity.guard';

export function UseEntityGuard<E>() {
  return (entity: Type<E>): MethodDecorator & ClassDecorator => {
    const guard = BuildEntityGuard(entity);
    return UseGuards(guard);
  };
}
