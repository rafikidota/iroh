import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './infra/user.repository';
import { UserPersistent } from './infra/user.persistent';
import { AuthModule } from '../auth/auth.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [
    TypeOrmModule.forFeature([UserPersistent]),
    AuthModule,
    PermissionModule,
  ],
  exports: [TypeOrmModule, UserService, UserRepository],
})
export class UserModule {}
