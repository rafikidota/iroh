import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import chalk from 'chalk';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger;
  constructor() {
    const options = { timestamp: true };
    this.logger = new Logger(LoggingInterceptor.name, options);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers } = request;
    const ip = headers['x-forwarded-for'] || request.connection.remoteAddress;

    if (!request.startTime) {
      request.startTime = Date.now();
    }
    return next.handle().pipe(
      tap(() => {
        const { startTime } = context.switchToHttp().getRequest();
        const endTime = Date.now();
        const timestamp = endTime - startTime;
        const time = chalk.yellow(`+${timestamp}ms`);
        const { statusCode } = context.switchToHttp().getResponse();
        this.logger.log(`${method} ${url} ${statusCode} OK - ${ip} - ${time}`);
      }),
    );
  }
}
