import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, Type } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import dotenv from 'dotenv';
import { Payload } from '../interfaces';
import { GenericUser } from '../../../security/user';

dotenv.config();

export function JwtStrategy<T extends GenericUser>(E: Type<T>) {
  @Injectable()
  class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(E) readonly repository: Repository<T>) {
      const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
      const ignoreExpiration = false;
      const secretOrKey = process.env.JWT_SECRET;
      if (!secretOrKey) {
        throw new Error('JWT_SECRET is not defined');
      }
      const strategy = { jwtFromRequest, ignoreExpiration, secretOrKey };
      super(strategy);
    }

    async validate(payload: Payload) {
      const { id } = payload;
      const where = { where: { id } } as unknown as FindOneOptions<T>;
      const user = await this.repository.findOne(where);
      if (!user) {
        throw new BadRequestException(`${E.name} with id ${id} not found`);
      }
      return user;
    }
  }
  return JwtStrategy;
}
