import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiEnvConfig } from './api.env.config';
import { ApiConfigValidationSchema } from './api.env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ApiEnvConfig],
      validationSchema: ApiConfigValidationSchema,
    }),
  ],
})
export class ApiConfigModule {}
