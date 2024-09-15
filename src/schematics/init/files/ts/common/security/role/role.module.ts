import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RolePersistent } from './infra/role.persistent';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([RolePersistent]), AuthModule],
  exports: [TypeOrmModule, RoleService],
})
export class RoleModule {}
