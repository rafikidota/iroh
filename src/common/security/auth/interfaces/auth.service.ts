import { DeepPartial, FindOneOptions } from 'typeorm';
import { Payload } from './payload';
import { IAuthResponse } from './auth-response';

export type IGenericAuthService<T, DTO> = {
  signup(createDto: DeepPartial<DTO>): Promise<Partial<T>>;
  signin(user: T): Promise<IAuthResponse>;
  signout(user: Payload): Promise<void>;
  findUser(where: FindOneOptions<T>): Promise<T>;
};
