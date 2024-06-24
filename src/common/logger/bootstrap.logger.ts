import { Logger } from '@nestjs/common';

export function BootstrapLogger(port: number) {
  const logger = new Logger('BootstrapLogger');
  logger.log(`App running on port ${port} 🚀`);
}
