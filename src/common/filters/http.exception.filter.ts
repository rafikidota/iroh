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
  private readonly logger;
  constructor() {
    super();
    const options = { timestamp: true };
    this.logger = new Logger(HttpExceptionFilter.name, options);
  }

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
    const log = `${method} ${url} ${status} - ${message} - ${ip} - ${time}`;

    if (
      [
        HttpStatus.INTERNAL_SERVER_ERROR,
        HttpStatus.NOT_IMPLEMENTED,
        HttpStatus.BAD_GATEWAY,
        HttpStatus.SERVICE_UNAVAILABLE,
        HttpStatus.GATEWAY_TIMEOUT,
        HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
      ].includes(status)
    ) {
      this.logger.error(log);
    }

    if (
      [
        HttpStatus.BAD_REQUEST,
        HttpStatus.UNAUTHORIZED,
        HttpStatus.PAYMENT_REQUIRED,
        HttpStatus.FORBIDDEN,
        HttpStatus.NOT_FOUND,
        HttpStatus.METHOD_NOT_ALLOWED,
        HttpStatus.NOT_ACCEPTABLE,
        HttpStatus.PROXY_AUTHENTICATION_REQUIRED,
        HttpStatus.REQUEST_TIMEOUT,
        HttpStatus.CONFLICT,
        HttpStatus.GONE,
        HttpStatus.LENGTH_REQUIRED,
        HttpStatus.PRECONDITION_FAILED,
        HttpStatus.PAYLOAD_TOO_LARGE,
        HttpStatus.URI_TOO_LONG,
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
        HttpStatus.EXPECTATION_FAILED,
        HttpStatus.I_AM_A_TEAPOT,
        HttpStatus.MISDIRECTED,
        HttpStatus.UNPROCESSABLE_ENTITY,
        HttpStatus.FAILED_DEPENDENCY,
        HttpStatus.PRECONDITION_REQUIRED,
        HttpStatus.TOO_MANY_REQUESTS,
      ].includes(status)
    ) {
      this.logger.warn(log);
    }

    super.catch(exception, host);
  }
}
