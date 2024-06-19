import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError, handleDatabaseError } from '../../common';
import { FindOneOptions, Repository } from 'typeorm';

export function BuildEntityGuard<T>(E: new () => T) {
  @Injectable()
  class EntityGuard implements CanActivate {
    repository: Repository<T>;

    constructor(@InjectRepository(E) repository: Repository<T>) {
      this.repository = repository;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        const req = context.switchToHttp().getRequest();
        const { id } = req.params;
        const where = { where: { id } } as unknown as FindOneOptions<T>;
        const entity = await this.repository.findOne(where);
        if (!entity) {
          const { name } = this.repository.metadata;
          throw new NotFoundException(`${name} with id ${id} not found`);
        }
        Object.assign(req, { entity });
        return true;
      } catch (error) {
        handleDatabaseError(error as AppError);
      }
    }
  }

  return EntityGuard;
}
