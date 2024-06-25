import { Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { GenericUser } from '../user';
import { JwtStrategy } from './strategies';
import type { IGenericAuthController, IGenericAuthService } from './interfaces';

dotenv.config();
export function BuildGenericAuthModule<
  T extends GenericUser,
  C extends IGenericAuthController<T>,
  A extends IGenericAuthService<T>,
>(User: Type<T>, AuthController: Type<C>, AuthService: Type<A>) {
  @Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [
      TypeOrmModule.forFeature([User]),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: process.env.JWT_SECRET || uuidv4(),
        signOptions: { expiresIn: '72h' },
      }),
    ],
    exports: [TypeOrmModule, JwtModule, PassportModule, JwtStrategy],
  })
  class AuthModule {}
  return AuthModule;
}
