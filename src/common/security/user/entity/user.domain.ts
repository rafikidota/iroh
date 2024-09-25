import { GenericDomain } from '../../../../crud/mapper';
import { UserRoleEnumType, UserStatusEnumType } from '../enum';

export class GenericUserDomain extends GenericDomain {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  type: UserRoleEnumType;
  status: UserStatusEnumType;
}
