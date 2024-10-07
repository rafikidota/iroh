import { GenericUserView } from '../../user';

export interface IAuthResponse<V extends GenericUserView> {
  token: string;
  user: V;
}
