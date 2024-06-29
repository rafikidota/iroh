import { Logger } from '@nestjs/common';

export interface BootstrapLoggerOptions {
  port: number;
  swagger?: string;
}

const getLog = (options: BootstrapLoggerOptions) => {
  const { port, swagger } = options;
  const url = 'http://localhost';
  if (swagger) {
    return `Swagger running on ${url}:${port}/${swagger} 🚀`;
  }
  return `App running on ${url}:${port} 🚀`;
};

export function BootstrapLogger(options: BootstrapLoggerOptions) {
  const logger = new Logger('BootstrapLogger');
  logger.log(getLog(options));
}
