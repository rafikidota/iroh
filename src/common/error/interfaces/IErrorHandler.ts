import { AppError } from '../types';

export interface IErrorHandler {
  catch(error: AppError): void;
}
