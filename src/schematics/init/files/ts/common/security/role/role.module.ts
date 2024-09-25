import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './infra/role.repository';
import { RolePersistent } from './infra/role.persistent';
import { AuthModule } from '../auth/auth.module';
import { PermissionModule } from '../permission';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  imports: [
    TypeOrmModule.forFeature([RolePersistent]),
    AuthModule,
    PermissionModule,
  ],
  exports: [TypeOrmModule, RoleService, RoleRepository],
})
export class RoleModule {}
