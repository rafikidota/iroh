import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericPermission } from '../entity';
import { NoPermissionNeededKey } from '../decorators';

export function BuildPermissionGuard<T extends GenericPermission>(E: Type<T>) {
  @Injectable()
  class PermissionGuard implements CanActivate {
    constructor(
      @InjectRepository(E)
      readonly repository: Repository<T>,
      readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const handler = context.getHandler();
      const NoPermissionNeeded = this.reflector.get<boolean>(
        NoPermissionNeededKey,
        handler,
      );

      return NoPermissionNeeded ? true : false;
    }
  }
  return PermissionGuard;
}
