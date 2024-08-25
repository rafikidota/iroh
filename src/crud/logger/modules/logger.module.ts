import { Module, Global } from '@nestjs/common';
import { RepositoryLogger, SeederLogger, ServiceLogger } from '../providers';

@Global()
@Module({
  providers: [ServiceLogger, RepositoryLogger, SeederLogger],
  exports: [ServiceLogger, RepositoryLogger, SeederLogger],
})
export class LoggerModule {}
