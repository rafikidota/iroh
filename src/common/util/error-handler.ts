import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppError } from '../error/app.error';

export function handleDatabaseError(error: AppError) {
  if (error.getStatus() < 500) {
    throw error;
  }
  if (error.code) {
    // Handle PostgreSQL errors
    switch (error.code) {
      case '23505': // Unique violation
        throw new ConflictException('Duplicate entry');
      case '23503': // Foreign key violation
        throw new BadRequestException('Invalid reference');
      case '23502': // Not null violation
        throw new BadRequestException(
          'Null value in column that does not accept nulls',
        );
      case '23514': // Check violation
        throw new BadRequestException('Check constraint violation');
      case '23518': // Exclusion violation
        throw new BadRequestException('Exclusion constraint violation');
      case '42883': // Undefined function
        throw new BadRequestException('Function does not exist');
      case '42P01': // Undefined table
        throw new BadRequestException('Table does not exist');
      case '42P02': // Undefined parameter
        throw new BadRequestException('Parameter does not exist');
      default:
        throw new InternalServerErrorException('Database error');
    }
  } else {
    // Handle other errors
    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
