import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericUser } from './entity';
import { DeepPartial } from 'typeorm';
import type { IGenericAuthController } from '../auth';
import type { IGenericService } from '../../crud';
export function BuildGenericUserModule<
  T extends GenericUser,
  D extends DeepPartial<T>,
  C extends IGenericAuthController<T>,
  U extends IGenericService<T, D>,
>(
  User: Type<T>,
  UserController: Type<C>,
  UserService: Type<U>,
  AuthModule: DynamicModule | Promise<DynamicModule>,
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
