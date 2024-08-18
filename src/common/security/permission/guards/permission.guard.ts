import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericPermission } from '../entity';

export function BuildPermissionGuard<T extends GenericPermission>(E: Type<T>) {
  @Injectable()
  class PermissionGuard implements CanActivate {
    constructor(@InjectRepository(E) readonly repository: Repository<T>) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      return context ? true : false;
    }
  }
  return PermissionGuard;
}
