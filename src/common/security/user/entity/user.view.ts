import { ApiProperty } from '@nestjs/swagger';
import { GenericView } from '../../../../crud/mapper';
import { UserRoleEnum, UserRoleEnumType } from '../enum';

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
    examples: ['john.doe@email.com', 'jdoe', 'john.doe'],
  })
  username: string;

  @ApiProperty({
    example: 'john.doe@email.com',
  })
  email: string;

  @ApiProperty({
    enum: UserRoleEnum,
  })
  type: UserRoleEnumType;
}
