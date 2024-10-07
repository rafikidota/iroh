import { FindOneOptions } from 'typeorm';
import { Payload } from './payload';
import { IAuthResponse } from './auth-response';
import {
  CreateGenericUserDto,
  GenericUser,
  GenericUserView,
} from '../../user/';

export type IGenericAuthService<
  T extends GenericUser,
  DTO extends CreateGenericUserDto,
  V extends GenericUserView,
  AuthResponse extends IAuthResponse<V>,
> = {
  signup(createDto: DTO): Promise<AuthResponse>;
  signin(user: T): Promise<AuthResponse>;
  signout(user: Payload): Promise<void>;
  findUser(where: FindOneOptions<T>): Promise<T>;
};
