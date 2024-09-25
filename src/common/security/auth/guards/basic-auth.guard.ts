import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Buffer } from 'buffer';
import { Request } from 'express';
import { GenericUser } from '../../user/entity/user.persistent';

export function BuildBasicAuthGuard<T extends GenericUser>(E: Type<T>) {
  @Injectable()
  class BasicAuthGuard implements CanActivate {
    constructor(@InjectRepository(E) readonly repository: Repository<T>) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      const { authorization } = request.headers;
      if (authorization && authorization.startsWith('Basic')) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [prefix, auth] = authorization.split('Basic');
        const buffer = Buffer.from(auth, 'base64');
        const [username, password] = buffer.toString().split(':');
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
