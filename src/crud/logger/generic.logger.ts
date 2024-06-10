import { Injectable, Logger } from '@nestjs/common';
import * as chalk from 'chalk';
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
    const log = chalk.green(`[POST] ${message}`);
    const timestamp = this.getTimestamp();
    super.log(`${log} ${timestamp}`);
  }

  get(message: string) {
    const log = chalk.magenta(`[GET] ${message}`);
    const timestamp = this.getTimestamp();
    super.log(`${log} ${timestamp}`);
  }

  patch(message: string) {
    const log = chalk.cyan(`[PATCH] ${message}`);
    const timestamp = this.getTimestamp();
    super.log(`${log} ${timestamp}`);
  }

  delete(message: string) {
    const log = chalk.red(`[DELETE] ${message}`);
    const timestamp = this.getTimestamp();
    super.log(`${log} ${timestamp}`);
  }
}
