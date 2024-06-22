export type IGenericAuthService<T> = {
  signup(user: T): Promise<Partial<T>>;
  signin(user: T): Promise<Partial<T>[]>;
  signout(user: T): Promise<Partial<T>>;
};
