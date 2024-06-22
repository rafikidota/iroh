import { Request } from 'express';

export type IGenericAuthService<T> = {
  signup(req: Request): Promise<Partial<T>>;
  signin(req: Request): Promise<Partial<T>[]>;
  signout(req: Request): Promise<Partial<T>>;
};
