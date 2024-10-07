import { DeepPartial } from 'typeorm';
import { IAuthResponse } from './auth-response';

export type IGenericAuthController<T> = {
  signup(createDto: DeepPartial<T>): Promise<Partial<T>>;
  signin(user: T): Promise<IAuthResponse>;
  signout(user: T): Promise<void>;
};
