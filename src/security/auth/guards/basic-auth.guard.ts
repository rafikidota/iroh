import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Buffer } from 'buffer';
import { Request } from 'express';
import { GenericUser } from '../../user/user.generic';

export function BuildBasicAuthGuard<T extends GenericUser>(E: new () => T) {
  @Injectable()
  class BasicAuthGuard implements CanActivate {
    constructor(@InjectRepository(E) readonly repository: Repository<T>) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      const { authorization } = request.headers;
      if (authorization && authorization.startsWith('Basic')) {
        const [username, password] = Buffer.from(
          authorization.split('Basic')[1],
          'base64',
        )
          .toString()
          .split(':');
        const where = { where: { username } } as unknown as FindOneOptions<T>;
        const user = await this.repository.findOne(where);
        if (!user) {
          const { name: entity } = this.repository.metadata;
          throw new NotFoundException(`${entity} ${username} not found`);
        }
        const ok = await user.verifyPassword(password);
        if (!ok) {
          throw new UnauthorizedException('Wrong credential');
        }
        Object.assign(request, { user });
        return true;
      }
      return false;
    }
  }
  return BasicAuthGuard;
}
