import { IAuthResponse } from './auth-response';
import { CreateGenericUserDto, GenericUser, GenericUserView } from '../../user';

export type IGenericAuthController<
  T extends GenericUser,
  DTO extends CreateGenericUserDto,
  V extends GenericUserView,
  AuthResponse extends IAuthResponse<V>,
> = {
  signup(createDto: DTO): Promise<AuthResponse>;
  signin(user: T): Promise<AuthResponse>;
  signout(user: T): Promise<void>;
};
