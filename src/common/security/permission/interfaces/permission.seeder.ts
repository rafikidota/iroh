import { Logger } from '@nestjs/common';
import { AxiosResponse, AxiosError } from 'axios';

export type IPermissionSeeder = {
  logger: Logger;
  getSwaggerJson(): Promise<AxiosResponse<any, any> & AxiosError<any, any>>;
  synchronize(): Promise<void>;
};
