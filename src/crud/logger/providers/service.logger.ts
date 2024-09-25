import { Injectable } from '@nestjs/common';
import chalk from 'chalk';
import { GenericLogger } from './generic.logger';
import { PaginateLoggerOptions, TitleCaseOperationLevel } from '../util';

@Injectable()
export class ServiceLogger extends GenericLogger {
  startTime: number = Date.now();
  constructor(context: string) {
    super(context);
  }

  restart() {
    this.startTime = Date.now();
  }

  created(id: string) {
    const log = chalk.green(`${TitleCaseOperationLevel.CREATE} ${id}`);
    this.print(log);
  }

  foundOne(id: string) {
    const log = chalk.cyan(`${TitleCaseOperationLevel.FINDONE} ${id}`);
    this.print(log);
  }

  foundMany(query: PaginateLoggerOptions) {
    const { length } = query;
    const log = chalk.magenta(
      `${TitleCaseOperationLevel.PAGINATE} - Found: ${length}`,
    );
    this.print(log);
  }

  updated(id: string) {
    const log = chalk.hex('#FF6700')(`${TitleCaseOperationLevel.UPDATE} ${id}`);
    this.print(log);
  }

  removed(id: string) {
    const log = chalk.red(`${TitleCaseOperationLevel.REMOVE} ${id}`);
    this.print(log);
  }

  private print(log: string) {
    const timestamp = this.getTimestamp();
    super.log(`${log} ${timestamp}`);
  }
}
