import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import chalk from 'chalk';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const { method, url, headers, startTime } = request;
    const { message } = exception;
    const endTime = Date.now();
    const timestamp = endTime - startTime;
    const time = chalk.yellow(`+${timestamp}ms`);

    const ip = headers['x-forwarded-for'] || request.connection.remoteAddress;
    const lvl = status === HttpStatus.INTERNAL_SERVER_ERROR ? 'error' : 'warn';
    const log = `${method} ${url} ${status} - ${message} - ${ip} - ${time}`;

    this.logger[lvl](log);

    super.catch(exception, host);
  }
}
