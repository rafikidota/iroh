import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthEnvConfig } from './auth.env.config';
import { AuthConfigValidationSchema } from './auth.env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AuthEnvConfig],
      validationSchema: AuthConfigValidationSchema,
    }),
  ],
})
export class AuthConfigModule {}
