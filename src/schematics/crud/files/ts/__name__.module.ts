import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from '../../common/security/security.module';
import { <%= classify(name) %>Controller } from './<%= lowerCase(name) %>.controller';
import { <%= classify(name) %>Service } from './<%= lowerCase(name) %>.service';
import { <%= classify(name) %>Repository } from './<%= lowerCase(name) %>.repository';
import { <%= classify(name) %>Persistent } from './entities/<%= lowerCase(name) %>.entity';

@Module({
  controllers: [<%= classify(name) %>Controller],
  providers: [<%= classify(name) %>Service, <%= classify(name) %>Repository],
  imports: [TypeOrmModule.forFeature([<%= classify(name) %>Persistent]), SecurityModule],
  exports: [TypeOrmModule],
})
export class <%= classify(name) %>Module {}
