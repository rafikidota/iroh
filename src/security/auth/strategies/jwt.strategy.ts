import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { Payload } from '../interfaces';

dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secretOrKey = process.env.JWT_SECRET || uuidv4();
    const strategy = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey,
    };
    super(strategy);
  }

  async validate(payload: Payload) {
    return { id: payload.id };
  }
}
