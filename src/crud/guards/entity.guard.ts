import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Request } from 'express';
import { AppError, handleDatabaseError } from '../../common';

export function BuildEntityGuard<T>(E: new () => T) {
  @Injectable()
  class EntityGuard implements CanActivate {
    repository: Repository<T>;

    constructor(@InjectRepository(E) repository: Repository<T>) {
      this.repository = repository;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        const request = context.switchToHttp().getRequest<Request>();
        const { id } = request.params;
        const where = { where: { id } } as unknown as FindOneOptions<T>;
        const entity = await this.repository.findOne(where);
        if (!entity) {
          const { name } = this.repository.metadata;
          throw new NotFoundException(`${name} with id ${id} not found`);
        }
        Object.assign(request, { entity });
        return true;
      } catch (error) {
        handleDatabaseError(error as AppError);
      }
    }
  }

  return EntityGuard;
}
