import { Injectable, Logger } from '@nestjs/common';
import chalk from 'chalk';
import { LogLevel } from './level.interface';

@Injectable()
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

  post(message: string) {
    const log = chalk.green(`[${LogLevel.POST}] ${message}`);
    const timestamp = this.getTimestamp();
    super.log(`${log} ${timestamp}`);
  }

  get(message: string) {
    const log = chalk.magenta(`[${LogLevel.GET}] ${message}`);
    const timestamp = this.getTimestamp();
    super.log(`${log} ${timestamp}`);
  }

  patch(message: string) {
    const log = chalk.cyan(`[${LogLevel.PATCH}] ${message}`);
    const timestamp = this.getTimestamp();
    super.log(`${log} ${timestamp}`);
  }

  delete(message: string) {
    const log = chalk.red(`[${LogLevel.DELETE}] ${message}`);
    const timestamp = this.getTimestamp();
    super.log(`${log} ${timestamp}`);
  }
}
