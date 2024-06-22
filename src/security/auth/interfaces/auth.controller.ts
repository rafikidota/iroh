import { Request } from 'express';

export type IGenericAuthController<T> = {
  signup(req: Request): Promise<Partial<T>>;
  signin(req: Request): Promise<Partial<T>[]>;
  signout(req: Request): Promise<Partial<T>>;
};
