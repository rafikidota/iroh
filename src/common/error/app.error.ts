import { HttpException } from '@nestjs/common';
import { PostgresError } from './postgresql.error';

export type AppError = PostgresError & HttpException;
