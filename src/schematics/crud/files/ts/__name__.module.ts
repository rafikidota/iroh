import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../common/security/auth/auth.module';
import { <%= classify(name) %> } from './entities/<%= lowerCase(name) %>.entity';
import { <%= classify(name) %>Controller } from './<%= lowerCase(name) %>.controller';
import { <%= classify(name) %>Service } from './<%= lowerCase(name) %>.service';
import { <%= classify(name) %>Repository } from './<%= lowerCase(name) %>.repository';

@Module({
  controllers: [<%= classify(name) %>Controller],
  providers: [<%= classify(name) %>Service, <%= classify(name) %>Repository],
  imports: [TypeOrmModule.forFeature([<%= classify(name) %>]), AuthModule],
  exports: [TypeOrmModule],
})
export class <%= classify(name) %>Module {}
