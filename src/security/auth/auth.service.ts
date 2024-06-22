import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { FindOneOptions, Repository } from 'typeorm';
import { GenericUser } from '../user';
import { IGenericAuthService, ISignInResponse } from './interfaces';
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
    public async signup(user: T): Promise<ISignInResponse> {
      const { id, name } = user;
      const payload: Payload = { id, name };
      const token = this.jwtService.sign(payload);
      const where = { where: { id } } as unknown as FindOneOptions<T>;
      const found = await this.repository.findOne(where);
      const response: ISignInResponse = { token, user: found };
      return response;
    }

    public async signin(user: T): Promise<Partial<T>> {
      this.logger.log('signin');
      return user;
    }
    public async signout(user: T): Promise<Partial<T>> {
      this.logger.log('signup');
      return user;
    }
  }
  return GenericAuthService;
}
