import { Logger } from '@nestjs/common';
import chalk from 'chalk';
const persistent = 'Persistent';

export class GenericLogger extends Logger {
  startTime: number = Date.now();
  constructor(context: string) {
    if (context.includes(persistent)) {
      context = context = context.replace(/Persistent(?=[^Persistent]*$)/, '');
    }
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

  setContext(context: string) {
    this.context = context;
  }
}
