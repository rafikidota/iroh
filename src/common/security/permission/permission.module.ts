import { Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DeepPartial } from 'typeorm';
import {
  GenericPermission,
  GenericPermissionDomain,
  GenericPermissionView,
} from './entity';
import type {
  IGenericController,
  IGenericRepository,
  IGenericService,
} from 'crud';
import type { IPermissionSeeder } from './interfaces';

export function GenericPermissionModule<
  T extends GenericPermission,
  D extends GenericPermissionDomain,
  V extends GenericPermissionView,
  DTO extends DeepPartial<T>,
  C extends IGenericController<T, DTO, V>,
  S extends IGenericService<T, DTO, D, V>,
>(
  Permission: Type<T>,
  PermissionController: Type<C>,
  PermissionService: Type<S>,
  PermissionRepository: Type<IGenericRepository<T, DTO>>,
  PermissionSeeder: Type<IPermissionSeeder>,
  AuthModule: Type<any>,
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
    exports: [
      TypeOrmModule,
      PermissionService,
      PermissionRepository,
      PermissionSeeder,
    ],
  })
  class PermissionModule {}
  return PermissionModule;
}
