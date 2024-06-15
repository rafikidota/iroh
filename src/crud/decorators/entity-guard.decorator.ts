import {
  applyDecorators,
  SetMetadata,
  UseGuards,
  Type,
  Injectable,
} from '@nestjs/common';
import { GenericService } from '../services/generic.service';
import { EntityGuard } from '../guards/entity.guard';
import { GenericPersistentEntity } from '../entity';
import { DefaultDto } from '../dto';

class T extends GenericPersistentEntity {}
class D extends DefaultDto {}

export const InjectService = (service: Type<GenericService<T, D>>) =>
  SetMetadata('service', service);

export const UseEntityGuard = (service: Type<GenericService<T, D>>) => {
  @Injectable()
  class ServiceInjectedGuard extends EntityGuard<T, D> {
    constructor() {
      super(new service());
    }
  }

  return applyDecorators(
    UseGuards(ServiceInjectedGuard),
    InjectService(service),
  );
};
