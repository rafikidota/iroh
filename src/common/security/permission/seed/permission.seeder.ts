import { Injectable, OnModuleInit, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { DeepPartial, Repository } from 'typeorm';
import { AxiosResponse, AxiosError } from 'axios';
import { firstValueFrom, catchError, of } from 'rxjs';
import { GenericPermission } from '../entity';
import { SeederLogger } from './../../../../crud/logger';

export function GenericPermissionSeeder<T extends GenericPermission>(
  E: Type<T>,
) {
  @Injectable()
  class PermissionSeeder implements OnModuleInit {
    readonly logger: SeederLogger;
    constructor(
      readonly config: ConfigService,
      readonly http: HttpService,
      @InjectRepository(E)
      readonly repository: Repository<T>,
    ) {
      this.logger = new SeederLogger(this.constructor.name);
    }
    onModuleInit() {
      this.synchronize();
    }

    async getSwaggerJson(): Promise<
      AxiosResponse<any, any> & AxiosError<any, any>
    > {
      const url = this.config.get('SWAGGER_JSON');
      const response = await firstValueFrom(
        this.http.get(url).pipe(catchError((err) => of(err))),
      );
      return response;
    }

    async synchronize() {
      const axios = await this.getSwaggerJson();
      const { data, response } = axios;
      const status = axios.status ?? response?.status;
      const statusText = axios.statusText ?? response?.statusText;

      if (status !== 200) {
        const { message } = response?.data;
        this.logger.error(
          `Error ${message} seeding permissions`,
          response?.data,
        );
        throw new Error(message || statusText);
      }

      const permissions = await this.repository.find();
      const { paths } = data;

      for (const [route, methods] of Object.entries(paths)) {
        for (const [methodProp, endpoint] of Object.entries(methods)) {
          const { tags } = endpoint;
          const code: string = endpoint.operationId;
          const [tag] = tags;
          const name = `${methodProp}${tag}`;
          const method: string = methodProp.toUpperCase();
          const permission = permissions.find(
            (p: T) => p.path === route && p.method === method,
          );

          if (!permission) {
            const data = {
              name,
              code,
              method,
              path: route,
              description: 'Generated by permission seeder',
            } as unknown as DeepPartial<T>;
            const newPermission = await this.repository.save(data);
            this.logger.seeded(newPermission.code);
          }
        }
      }
    }
  }

  return PermissionSeeder;
}
