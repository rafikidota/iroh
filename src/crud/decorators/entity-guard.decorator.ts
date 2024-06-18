/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetMetadata, UseGuards, Type } from '@nestjs/common';
import { BuildEntityGuard } from '../guards/entity.guard';

export const EntityGuard = <T>(entity: Type<T>) => {
  return SetMetadata('entity', entity);
};

export const UseEntityGuard = <T>(entity: Type<T>) => {
  return (target: Record<string, any>, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const entityGuard = BuildEntityGuard(entity);
    UseGuards(entityGuard)(target, key, descriptor);
  };
};

