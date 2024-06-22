import { GenericUser } from '../../user';

export interface ISignInResponse {
  token: string;
  user: GenericUser;
}
