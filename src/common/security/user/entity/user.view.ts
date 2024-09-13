import { ApiProperty } from '@nestjs/swagger';
import { GenericView } from '../../../../crud/mapper';
import { UserRoleEnumType } from '../enum';

export class GenericUserView extends GenericView {
  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  type: UserRoleEnumType;
}
