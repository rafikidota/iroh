import { Injectable, NotFoundException, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { FindOneOptions, Repository } from 'typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Payload } from '../interfaces';
import { GenericUser } from '../../../security/user';
import { ConfigService } from '@nestjs/config';

export function JwtStrategy<T extends GenericUser>(E: Type<T>) {
  @Injectable()
  class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      @InjectRepository(E)
      readonly repository: Repository<T>,
      readonly config: ConfigService,
    ) {
      const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
      const ignoreExpiration = false;
      const secretOrKey = config.get<string>('JWT_SECRET');
      const strategy = { jwtFromRequest, ignoreExpiration, secretOrKey };
      super(strategy);
    }

    async validate(payload: Payload) {
      const { id } = payload;
      const where = { where: { id } } as unknown as FindOneOptions<T>;
      const user = await this.repository.findOne(where);
      if (!user) {
        throw new NotFoundException(`${E.name} with id ${id} not found`);
      }
      return user;
    }
  }
  return JwtStrategy;
}
