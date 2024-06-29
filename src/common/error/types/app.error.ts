import { HttpException } from '@nestjs/common';
import { PostgresError } from '../database/postgresql.error';

export type AppError = PostgresError | HttpException;
