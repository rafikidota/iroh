import { ApiProperty } from '@nestjs/swagger';
import { GenericView } from '../../../../crud/mapper';
import { UserTypeEnum, UserRoleEnumType } from '../enum/user.role.enum';
import { UserStatusEnum, UserStatusEnumType } from '../enum/user.status.enum';

export class GenericUserView extends GenericView {
  @ApiProperty({
    example: 'John',
  })
  name: string;

  @ApiProperty({
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    example: 'john.doe',
  })
  username: string;

  @ApiProperty({
    example: 'john.doe@email.com',
  })
  email: string;

  @ApiProperty({
    enum: UserTypeEnum,
    default: UserTypeEnum.ADMIN,
  })
  type: UserRoleEnumType;

  @ApiProperty({
    enum: UserStatusEnum,
    default: UserStatusEnum.ENABLED,
  })
  status: UserStatusEnumType;
}
