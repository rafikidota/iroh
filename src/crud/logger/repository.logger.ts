import { Injectable } from '@nestjs/common';
import { PaginateLoggerOptions } from './util';
import { GenericLogger } from './generic.logger';
import {
  LowerCaseOperationLevel,
  TitleCaseOperationLevel,
} from './util/levels';

@Injectable()
export class RepositoryLogger extends GenericLogger {
  public name: string;
  constructor(name: string) {
    const context = `${name}Repository`;
    super(context);
    this.name = name;
  }

  created(id: string) {
    const log = this.getSingleEntityLog(LowerCaseOperationLevel.CREATE, id);
    super.verbose(log);
  }

  foundOne(id: string) {
    const log = this.getSingleEntityLog(LowerCaseOperationLevel.FINDONE, id);
    super.verbose(log);
  }

  foundMany(query: PaginateLoggerOptions) {
    const { limit, offset, page, length } = query;
    const timestamp = this.getTimestamp();
    const log = `[${TitleCaseOperationLevel.PAGINATE} - Limit: ${limit}, Offset: ${offset}, Page: ${page}, Found: ${length}] ${timestamp}`;
    super.verbose(log);
  }

  updated(id: string) {
    const log = this.getSingleEntityLog(LowerCaseOperationLevel.UPDATE, id);
    super.verbose(log);
  }

  removed(id: string) {
    const log = this.getSingleEntityLog(LowerCaseOperationLevel.REMOVE, id);
    super.verbose(log);
  }

  private getSingleEntityLog(operation: string, id: string) {
    const timestamp = this.getTimestamp();
    return `${this.name} ${operation} successfully [${id}] ${timestamp}`;
  }
}
