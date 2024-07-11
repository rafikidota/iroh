import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import chalk from 'chalk';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(LoggingInterceptor.name);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers } = request;
    const ip = headers['x-forwarded-for'] || request.connection.remoteAddress;

    const startTime = Date.now();
    Object.assign(request, { startTime });
    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const timestamp = endTime - startTime;
        const time = chalk.yellow(`+${timestamp}ms`);
        const { statusCode } = context.switchToHttp().getResponse();
        this.logger.log(`${method} ${url} ${statusCode} OK - ${ip} - ${time}`);
      }),
    );
  }
}
