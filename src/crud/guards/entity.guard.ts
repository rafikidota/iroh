/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Type,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { GenericPersistentEntity } from '../entity';

export function BuildEntityGuard<T>(
  TEntity: new (...args: any[]) => T,
): Type<CanActivate> {
  @Injectable()
  class EntityGuard implements CanActivate {
    constructor(
      protected readonly repository: Repository<T> &
        Repository<GenericPersistentEntity>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const { id } = req.params;

      try {
        const { name } = this.repository.metadata;
        const entity = await this.repository.findOne(id);
        if (!entity) {
          throw new NotFoundException(`${name} with id ${id} not found`);
        }
        Object.assign(req, { entity });
        return true;
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
  }

  return EntityGuard;
}
