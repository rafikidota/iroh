import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { headers, method, url } = request;

    this.logger.log(`Method: ${method}, URL: ${url}`);
    const clonedHeaders = { ...headers };
    delete clonedHeaders.authorization;
    this.logger.log(`Headers: ${JSON.stringify(clonedHeaders)}`);

    return next.handle();
  }
}