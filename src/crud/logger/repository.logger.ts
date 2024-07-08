import { Injectable } from '@nestjs/common';
import { PaginateLoggerOptions } from './util';
import { GenericLogger } from './generic.logger';

@Injectable()
export class RepositoryLogger extends GenericLogger {
  public name: string;
  constructor(name: string) {
    const context = `${name}Repository`;
    super(context);
    this.name = name;
  }

  create(id: string) {
    const log = this.getSingleEntityLog('created', id);
    super.verbose(log);
  }

  findOne(id: string) {
    const log = this.getSingleEntityLog('found', id);
    super.verbose(log);
  }

  update(id: string) {
    const log = this.getSingleEntityLog('updated', id);
    super.verbose(log);
  }

  delete(id: string) {
    const log = this.getSingleEntityLog('removed', id);
    super.verbose(log);
  }

  paginate(query: PaginateLoggerOptions) {
    const { limit, offset, page, length } = query;
    const timestamp = this.getTimestamp();
    const log = `[Paginate - Limit: ${limit}, Offset: ${offset}, Page: ${page}, Found: ${length}] ${timestamp}`;
    super.verbose(log);
  }

  private getSingleEntityLog(operation: string, id: string) {
    const timestamp = this.getTimestamp();
    return `${this.name} ${operation} successfully ${id} ${timestamp}`;
  }
}
