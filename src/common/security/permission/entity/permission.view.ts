import { ApiProperty } from '@nestjs/swagger';
import { GenericView } from '../../../../crud/mapper';
import { PermissionMethodEnum, PermissionMethodEnumType } from '../enum';

export class GenericPermissionView extends GenericView {
  @ApiProperty({ example: 'Create user' })
  name: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  description: string;

  @ApiProperty({
    enum: PermissionMethodEnum,
    example: PermissionMethodEnum.POST,
  })
  method: PermissionMethodEnumType;

  @ApiProperty({ example: 'UserController_create' })
  code: string;

  @ApiProperty({ example: '/v1/user' })
  path: string;
}
