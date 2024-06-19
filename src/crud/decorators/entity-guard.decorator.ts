import { UseGuards, applyDecorators } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { BuildEntityGuard } from '../guards/entity.guard';

export const UseEntityGuard = <T>(Entity: Type<T>) => {
  return applyDecorators(UseGuards(BuildEntityGuard), InjectRepository(Entity));
};
