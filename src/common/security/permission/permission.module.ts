import { Module, OnModuleInit, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DeepPartial } from 'typeorm';
import { GenericPermission } from './entity';
import type {
  IGenericController,
  IGenericRepository,
  IGenericService,
} from 'crud';
import type { IPermissionSeeder } from './interfaces';

export function GenericPermissionModule<
  T extends GenericPermission,
  D extends DeepPartial<T>,
  C extends IGenericController<T, D>,
  S extends IGenericService<T, D>,
>(
  Permission: Type<T>,
  PermissionController: Type<C>,
  PermissionService: Type<S>,
  PermissionRepository: Type<IGenericRepository<T, D>>,
  PermissionSeeder: Type<IPermissionSeeder>,
  AuthModule: Type<unknown>,
) {
  @Module({
    controllers: [PermissionController],
    providers: [PermissionService, PermissionRepository, PermissionSeeder],
    imports: [
      TypeOrmModule.forFeature([Permission]),
      AuthModule,
      ConfigModule,
      HttpModule,
    ],
    exports: [TypeOrmModule, PermissionService],
  })
  class PermissionModule implements OnModuleInit {
    constructor(readonly seeder: IPermissionSeeder) {}

    async onModuleInit() {
      this.seeder.synchronize();
    }
  }
  return PermissionModule;
}
