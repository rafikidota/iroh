import { ISignInResponse } from './sign-in-response';

export type IGenericAuthService<T> = {
  signup(user: T): Promise<Partial<T>>;
  signin(user: T): Promise<ISignInResponse>;
  signout(user: T): Promise<void>;
};
