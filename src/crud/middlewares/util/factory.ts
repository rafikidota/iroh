import { Provider, Type } from '@nestjs/common';
import { GenericPersistentEntity } from '../../entity/generic.persistent.entity';
import { GenericService } from '../../services';
import { DefaultDto } from '../../dto';

export function EntityMiddlewareFactory<
  T extends GenericPersistentEntity,
  D extends DefaultDto,
>(service: Type<GenericService<T, D>>): Provider {
  return {
    provide: 'ENTITY_SERVICE',
    useClass: service,
  };
}
