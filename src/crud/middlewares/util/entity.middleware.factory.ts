import { Provider, Type } from '@nestjs/common';
import { GenericPersistentEntity } from '../../entity/generic.persistent.entity';
import { GenericService } from '../../services';
import { DeepPartial } from 'typeorm';

export function EntityMiddlewareFactory<
  T extends GenericPersistentEntity,
  D extends DeepPartial<T>,
>(service: Type<GenericService<T, D>>): Provider {
  return {
    provide: 'ENTITY_MIDDLEWARE',
    useClass: service,
  };
}
