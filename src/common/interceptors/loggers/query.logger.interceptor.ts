import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class QueryLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(QueryLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { query } = request;
    this.logger.debug(`Query: \n${JSON.stringify(query)}`);
    return next.handle();
  }
}
