import { SetMetadata } from '@nestjs/common';
import { GenericUser } from './../../user';

export const AUTH_ENTITY_KEY = 'AuthEntity';

export const AuthEntity = <T extends GenericUser>(entity: new () => T) =>
  SetMetadata(AUTH_ENTITY_KEY, entity);
