import { Module } from '@nestjs/common';
import { SwaggerConfigModule } from './swagger';
import { AuthConfigModule } from './auth/auth.config.module';
import { TypeormConfigModule } from './database';
import { ApiConfigModule } from './api/api.config.module';

@Module({
  imports: [
    ApiConfigModule,
    AuthConfigModule,
    TypeormConfigModule,
    SwaggerConfigModule,
  ],
  exports: [
    ApiConfigModule,
    AuthConfigModule,
    TypeormConfigModule,
    SwaggerConfigModule,
  ],
})
export class ConfigurationModule {}
