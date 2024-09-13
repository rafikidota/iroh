import { GenericDomain } from '../../../../crud/mapper';
import { UserRoleEnumType } from '../enum';

export class GenericUserDomain extends GenericDomain {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  type: UserRoleEnumType;
}
