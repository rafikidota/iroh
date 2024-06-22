import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { FindOneOptions, Repository } from 'typeorm';
import { Request } from 'express';
import { GenericUser } from '../user';
import { IGenericAuthService } from './interfaces';
import { GenericLogger } from './../../crud';
import { Payload } from './interfaces/payload';

export function BuildGenericAuthService<T extends GenericUser>(E: new () => T) {
  class GenericAuthService implements IGenericAuthService<T> {
    public logger: GenericLogger;
    constructor(
      @InjectRepository(E) readonly repository: Repository<T>,
      readonly jwtService: JwtService,
    ) {
      this.logger = new GenericLogger('AuthLogger');
    }
    public async signup(req: Request): Promise<Partial<T>> {
      const { id, name } = req.user as Partial<T>;
      const payload: Payload = { id, name };
      const token = this.jwtService.sign(payload);
      const where = { where: { id } } as unknown as FindOneOptions<T>;
      const user = await this.repository.findOne(where);
      this.logger.debug(token);
      return user;
    }

    public async signin(): Promise<Partial<T>[]> {
      this.logger.log('signin');
      return [];
    }
    public async signout(): Promise<Partial<T>> {
      this.logger.log('signup');
      return {};
    }
  }
  return GenericAuthService;
}
