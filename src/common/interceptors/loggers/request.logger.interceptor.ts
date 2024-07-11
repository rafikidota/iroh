import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(RequestLoggingInterceptor.name);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers } = request;
    const ip = headers['x-forwarded-for'] || request.connection.remoteAddress;

    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const time = endTime - startTime;
        const { statusCode } = context.switchToHttp().getResponse();
        this.logger.log(`${method} ${url} ${statusCode} - ${time}ms - ${ip}`);
      }),
    );
  }
}
