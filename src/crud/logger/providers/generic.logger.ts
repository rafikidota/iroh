import { Logger } from '@nestjs/common';
import chalk from 'chalk';

export class GenericLogger extends Logger {
  startTime: number = Date.now();
  constructor(context: string) {
    super(context, { timestamp: true });
  }

  restart() {
    this.startTime = Date.now();
  }

  getTimestamp() {
    const now = Date.now() - this.startTime;
    const timestamp = chalk.yellow(`+${now}ms`);
    return timestamp;
  }
}
