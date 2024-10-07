import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SwaggerEnvConfig } from './swagger.env.config';
import { SwaggerConfigValidationSchema } from './swagger.env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [SwaggerEnvConfig],
      validationSchema: SwaggerConfigValidationSchema,
    }),
  ],
})
export class SwaggerConfigModule {}
