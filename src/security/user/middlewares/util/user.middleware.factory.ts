import { Type, Provider } from '@nestjs/common';
import { CreateGenericUserDto } from '../../dto';
import { GenericUser } from '../../user.generic';
import { GenericUserService } from '../../user.service';

export function UserMiddlewareFactory<
  T extends GenericUser,
  D extends CreateGenericUserDto,
>(service: Type<GenericUserService<T, D>>): Provider {
  return {
    provide: 'USER_MIDDLEWARE',
    useClass: service,
  };
}
