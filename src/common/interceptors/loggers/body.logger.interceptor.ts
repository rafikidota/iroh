import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BodyLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(BodyLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;
    this.logger.debug(`Body: \n${JSON.stringify(body)}`);
    return next.handle();
  }
}
