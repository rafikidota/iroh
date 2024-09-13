import { Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericUser, GenericUserDomain, GenericUserView } from './entity';
import { DeepPartial } from 'typeorm';
import type { IGenericController, IGenericService } from '../../../crud';
export function GenericUserModule<
  T extends GenericUser,
  D extends GenericUserDomain,
  V extends GenericUserView,
  DTO extends DeepPartial<T>,
  C extends IGenericController<T, DTO, V>,
  U extends IGenericService<T, DTO, D, V>,
>(
  User: Type<T>,
  UserController: Type<C>,
  UserService: Type<U>,
  AuthModule: Type<any>,
) {
  @Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([User]), AuthModule],
    exports: [TypeOrmModule, UserService],
  })
  class UserModule {}
  return UserModule;
}
