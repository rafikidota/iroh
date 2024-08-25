import { Injectable } from '@nestjs/common';
import { GenericLogger } from './generic.logger';
import { GenericPersistent } from './../../entity/generic.persistent';

@Injectable()
export class SeederLogger<T extends GenericPersistent> extends GenericLogger {
  constructor(readonly entity: new () => T) {
    const context = `${entity.name}Seeder`;
    super(context);
  }

  seeded(id: string) {
    const log = this.getLog(id);
    super.debug(log);
  }

  private getLog(id: string) {
    const timestamp = this.getTimestamp();
    return `New ${this.entity.name} ${id} seeded ${timestamp}`;
  }
}
