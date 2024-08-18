import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericRole } from '../entity';

export function BuildRoleGuard<T extends GenericRole>(E: Type<T>) {
  @Injectable()
  class RoleGuard implements CanActivate {
    constructor(@InjectRepository(E) readonly repository: Repository<T>) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      return context ? true : false;
    }
  }
  return RoleGuard;
}
