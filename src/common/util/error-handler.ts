import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppError, ErrorMap, PostgresError } from '../error';
import { HttpException } from '@nestjs/common';

export function handleDatabaseError(error: AppError) {
  console.log(error);

  if (error instanceof HttpException && error.getStatus() < 500) {
    throw error;
  }
  if (error instanceof PostgresError && error.code) {
    const errors: ErrorMap = {
      '23505': () => {
        throw new ConflictException('Duplicate entry');
      },
      '23503': () => {
        throw new BadRequestException('Invalid reference');
      },
      '23502': () => {
        throw new BadRequestException(
          'Null value in column that does not accept nulls',
        );
      },
      '23514': () => {
        throw new BadRequestException('Check constraint violation');
      },
      '23518': () => {
        throw new BadRequestException('Exclusion constraint violation');
      },
      '42883': () => {
        throw new BadRequestException('Function does not exist');
      },
      '42P01': () => {
        throw new BadRequestException('Table does not exist');
      },
      '42P02': () => {
        throw new BadRequestException('Parameter does not exist');
      },
      default: () => {
        throw new InternalServerErrorException('Database error');
      },
    };
    const code = error.code in errors ? error.code : 'default';
    errors[code]();
  } else {
    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
