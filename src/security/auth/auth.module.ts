/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module, Type, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DeepPartial } from 'typeorm';
import { GenericUser } from '../user';
import { JwtStrategy } from './strategies';
import type { IGenericAuthController, IGenericAuthService } from './interfaces';
import type { IGenericService } from '../../crud';
export function BuildGenericAuthModule<
  T extends GenericUser,
  D extends DeepPartial<T>,
  C extends IGenericAuthController<T>,
  A extends IGenericAuthService<T>,
  U extends IGenericService<T, D>,
>(
  User: Type<T>,
  AuthController: Type<C>,
  AuthService: Type<A>,
  UserService: Type<U>,
  UserModule: Type<any>,
) {
  @Module({
    controllers: [AuthController],
    providers: [AuthService, UserService, JwtStrategy],
    imports: [
      TypeOrmModule.forFeature([User]),
      forwardRef(() => UserModule),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'defaultSecret', // Asegúrate de usar una variable de entorno
        signOptions: { expiresIn: '72h' },
      }),
    ],
    exports: [TypeOrmModule, JwtModule, PassportModule, JwtStrategy],
  })
  class AuthModule {}
  return AuthModule;
}
