import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@rafikidota/iroh';
import { SecurityModule } from './security/security.module';
import { ConfigurationModule } from './config/configuration.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigurationModule,
    SecurityModule,
    LoggerModule,
  ],
})
export class CommonModule {}
