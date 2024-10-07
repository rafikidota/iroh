import { GenericUser } from '../../user/entity';

export interface IAuthResponse {
  token: string;
  user: GenericUser;
}
