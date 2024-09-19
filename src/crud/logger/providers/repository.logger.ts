import { Injectable } from '@nestjs/common';
import { PaginateLoggerOptions } from '../util';
import { GenericLogger } from './generic.logger';
import { TitleCaseOperationLevel } from '../util/levels';

@Injectable()
export class RepositoryLogger extends GenericLogger {
  constructor(context: string) {
    super(context);
  }

  created(id: string) {
    const log = this.getSingleEntityLog(TitleCaseOperationLevel.CREATE, id);
    super.verbose(log);
  }

  foundOne(id: string) {
    const log = this.getSingleEntityLog(TitleCaseOperationLevel.FINDONE, id);
    super.verbose(log);
  }

  foundMany(query: PaginateLoggerOptions) {
    const { limit, offset, page, length } = query;
    const timestamp = this.getTimestamp();
    const log = `[${TitleCaseOperationLevel.PAGINATE} - Limit: ${limit}, Offset: ${offset}, Page: ${page}, Found: ${length}] ${timestamp}`;
    super.verbose(log);
  }

  updated(id: string) {
    const log = this.getSingleEntityLog(TitleCaseOperationLevel.UPDATE, id);
    super.verbose(log);
  }

  removed(id: string) {
    const log = this.getSingleEntityLog(TitleCaseOperationLevel.REMOVE, id);
    super.verbose(log);
  }

  private getSingleEntityLog(operation: string, id: string) {
    const timestamp = this.getTimestamp();
    return `${operation} ${id} ${timestamp}`;
  }
}
