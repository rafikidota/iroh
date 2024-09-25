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
import { UserTypeEnum } from '../../user/enum';

const replaceBracesWithColon = (route: string) => {
  return route.replace(/{(\w+)}/g, ':$1').toLowerCase();
};

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
      const controller = context.getClass();
      const targets = [handler, controller];
      const key = NoPermissionNeededKey;
      const ok =
        this.reflector.getAllAndOverride<boolean>(key, targets) || false;

      const request = context.switchToHttp().getRequest();
      const { user } = request;
      if (!user) {
        return false;
      }

      if (user.type === UserTypeEnum.ADMIN || ok) {
        return true;
      }

      const { role } = user;
      if (!role) {
        return false;
      }

      const { permissions } = role;
      if (!permissions || !permissions.length) {
        return false;
      }

      const { route } = request;
      const requestPath = route.path.toLowerCase();
      const requestMethod = request.method.toLowerCase();

      const allPermissions = await this.repository.find();

      for (const permission of allPermissions) {
        const { path, method } = permission;
        const permissionMethod = method.toLowerCase();
        const permissionPath = replaceBracesWithColon(path);

        if (
          requestMethod === permissionMethod &&
          requestPath === permissionPath
        ) {
          const hasPermission = permissions.some(
            (p: T) => p.id === permission.id,
          );
          if (hasPermission) {
            return true;
          }
        }
      }

      return false;
    }
  }
  return PermissionGuard;
}
