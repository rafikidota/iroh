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
import { InjectRepository } from '@nestjs/typeorm';

export function BuildEntityGuard<T>(
  entity: new (...args: any[]) => T,
): Type<CanActivate> {
  @Injectable()
  class EntityGuard implements CanActivate {
    constructor(
      @InjectRepository(entity) private readonly repository: Repository<T>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const { id } = request.params;

      try {
        const { name } = this.repository.metadata;
        const entity = await this.repository.findOne(id);
        if (!entity) {
          throw new NotFoundException(`${name} with id ${id} not found`);
        }
        request.entity = entity; // Añadir la entidad al request para el decorador @Entity
        return true;
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
  }

  return EntityGuard;
}
