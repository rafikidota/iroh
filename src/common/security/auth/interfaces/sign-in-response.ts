import { GenericUser } from '../../user/entity';

export interface ISignInResponse {
  token: string;
  user: GenericUser;
}
