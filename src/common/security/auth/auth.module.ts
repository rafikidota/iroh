import { Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CreateGenericUserDto, GenericUser, GenericUserView } from '../user';
import { JwtStrategy } from './strategies';
import type {
  IAuthResponse,
  IGenericAuthController,
  IGenericAuthService,
} from './interfaces';

export function GenericAuthModule<
  T extends GenericUser,
  V extends GenericUserView,
  DTO extends CreateGenericUserDto,
  R extends IAuthResponse<V>,
  C extends IGenericAuthController<T, DTO, V, R>,
  S extends IGenericAuthService<T, DTO, V, R>,
>(User: Type<T>, AuthController: Type<C>, AuthService: Type<S>) {
  @Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy(User)],
    imports: [
      TypeOrmModule.forFeature([User]),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          secret: config.get<string>('JWT_SECRET'),
        }),
      }),
    ],
    exports: [TypeOrmModule, JwtModule, PassportModule],
  })
  class AuthModule {}
  return AuthModule;
}
