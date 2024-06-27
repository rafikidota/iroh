import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
  Type,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Request } from 'express';
import { validate as validateUUID } from 'uuid';
import { AppError, handleDatabaseError } from '../../common';

export function BuildEntityGuard<T>(E: Type<T>) {
  @Injectable()
  class EntityGuard implements CanActivate {
    constructor(@InjectRepository(E) readonly repository: Repository<T>) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        const request = context.switchToHttp().getRequest<Request>();
        const { id } = request.params;
        const valid = validateUUID(id);
        if (!valid) {
          throw new BadRequestException('Validation failed (uuid is expected)');
        }
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
