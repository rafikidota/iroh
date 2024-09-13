import { ApiProperty } from '@nestjs/swagger';
import { GenericView } from '../../../../crud/mapper';
import { MethodPermissionEnum, MethodPermissionType } from '../enum';

export class GenericPermissionView extends GenericView {
  @ApiProperty({ example: 'Create user' })
  name: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  description: string;

  @ApiProperty({
    enum: MethodPermissionEnum,
    example: MethodPermissionEnum.POST,
  })
  method: MethodPermissionType;

  @ApiProperty({ example: 'UserController_create' })
  code: string;

  @ApiProperty({ example: '/v1/user' })
  path: string;
}
