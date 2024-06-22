import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Buffer } from 'buffer';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { GenericUser } from './../../user/user.generic';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private readonly repository: Repository<GenericUser>) {}

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
      const user = await this.repository.findOneBy({ username });
      if (!user) {
        throw new NotFoundException();
      }
      const ok = await user.verifyPassword(password);
      if (!ok) {
        throw new UnauthorizedException();
      }
      Object.assign(request, { user });
      return true;
    }
    return false;
  }
}
