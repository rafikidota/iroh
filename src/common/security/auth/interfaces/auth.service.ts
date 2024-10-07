import { DeepPartial, FindOneOptions } from 'typeorm';
import { Payload } from './payload';
import { ISignInResponse } from './sign-in-response';

export type IGenericAuthService<T, DTO> = {
  signup(createDto: DeepPartial<DTO>): Promise<Partial<T>>;
  signin(user: T): Promise<ISignInResponse>;
  signout(user: Payload): Promise<void>;
  findUser(where: FindOneOptions<T>): Promise<T>;
};
