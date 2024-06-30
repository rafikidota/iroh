/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericLogger } from './../../../crud/logger';
import { GenericUser } from './entity';
import { DeepPartial } from 'typeorm';
import type { IGenericController, IGenericService } from '../../../crud';
export function GenericUserModule<
  T extends GenericUser,
  D extends DeepPartial<T>,
  C extends IGenericController<T, D>,
  U extends IGenericService<T, D>,
>(
  User: Type<T>,
  UserController: Type<C>,
  UserService: Type<U>,
  AuthModule: Type<any>,
) {
  @Module({
    controllers: [UserController],
    providers: [UserService, GenericLogger],
    imports: [TypeOrmModule.forFeature([User]), AuthModule],
    exports: [TypeOrmModule, UserService],
  })
  class UserModule {}
  return UserModule;
}
