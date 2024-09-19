import { Injectable } from '@nestjs/common';
import { GenericLogger } from './generic.logger';

@Injectable()
export class SeederLogger extends GenericLogger {
  constructor(context: string) {
    super(context);
  }

  seeded(id: string) {
    const log = this.getLog(id);
    super.debug(log);
  }

  private getLog(id: string) {
    const timestamp = this.getTimestamp();
    return `${id} seeded ${timestamp}`;
  }
}
