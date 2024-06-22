import { ISignInResponse } from './sign-in-response';

export type IGenericAuthService<T> = {
  signup(user: T): Promise<ISignInResponse>;
  signin(user: T): Promise<Partial<T>>;
  signout(user: T): Promise<Partial<T>>;
};
