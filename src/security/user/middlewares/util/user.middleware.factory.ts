import { Type, Provider } from '@nestjs/common';
import { GenericService } from '../../../../crud';
import { CreateGenericUserDto } from '../../dto';
import { GenericUser } from '../../user.generic';

export function EntityMiddlewareFactory<
  T extends GenericUser,
  D extends CreateGenericUserDto,
>(service: Type<GenericService<T, D>>): Provider {
  return {
    provide: 'USER_MIDDLEWARE',
    useClass: service,
  };
}
