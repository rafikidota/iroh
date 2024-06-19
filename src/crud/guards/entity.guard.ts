/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export function BuildEntityGuard<T>(E: new (...arg: any) => T) {
  @Injectable()
  class DynamicEntityGuard implements CanActivate {
    repository: Repository<T>;

    constructor(@InjectRepository(E) repository: Repository<T>) {
      this.repository = repository;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const { id } = req.params;

      try {
        const entity = await this.repository.findOne(id);

        if (!entity) {
          throw new NotFoundException(
            `${this.repository.metadata.name} with id ${id} not found`,
          );
        }

        req.entity = entity;
        return true;
      } catch (error) {
        throw new InternalServerErrorException('Error while loading entity');
      }
    }
  }

  return DynamicEntityGuard;
}
