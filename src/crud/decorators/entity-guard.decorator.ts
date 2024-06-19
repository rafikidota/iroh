/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseGuards } from '@nestjs/common';
import { BuildEntityGuard } from '../guards/entity.guard';
import { Repository } from 'typeorm';

export const UseEntityGuard = (Entity: any) => {
  const repository = {} as Repository<typeof Entity>;
  return UseGuards(new BuildEntityGuard(repository));
};
