import { applyDecorators, UseGuards, Injectable, Type } from '@nestjs/common';
import { GenericService } from '../services/generic.service';
import { EntityGuard } from '../guards/entity.guard';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { DefaultDto } from '../dto/default.dto';
import { Reflector } from '@nestjs/core';

export const UseEntityGuard = <T extends GenericPersistentEntity, D extends DefaultDto>(service: Type<GenericService<T, D>>) => {
  @Injectable()
  class ServiceInjectedGuard extends EntityGuard<T, D> {
    constructor(private readonly injectedService: GenericService<T, D>) {
      super(new Reflector(), injectedService);
    }
  }

  return applyDecorators(
    UseGuards(ServiceInjectedGuard),
    (target: object, key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => {
      if (descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
          Reflect.defineMetadata('GENERIC_SERVICE', service, target.constructor);
          return originalMethod.apply(this, args);
        };
      } else {
        Reflect.defineMetadata('GENERIC_SERVICE', service, target);
      }
    }
  );
};
