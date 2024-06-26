import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../common/auth/auth.module';
import { <%= classify(name) %> } from './entities/<%= lowercase(name) %>.entity';
import { <%= classify(name) %>Controller } from './<%= lowercase(name) %>.controller';
import { <%= classify(name) %>Service } from './<%= lowercase(name) %>.service';

@Module({
  controllers: [<%= classify(name) %>Controller],
  providers: [<%= classify(name) %>Service],
  imports: [TypeOrmModule.forFeature([<%= classify(name) %>]), AuthModule],
  exports: [TypeOrmModule],
})
export class <%= classify(name) %>Module {}
