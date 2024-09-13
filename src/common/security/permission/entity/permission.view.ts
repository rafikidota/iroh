import { ApiProperty } from '@nestjs/swagger';
import { GenericView } from '../../../../crud/mapper';
import { MethodPermissionType } from '../enum';

export class GenericPermissionView extends GenericView {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  method: MethodPermissionType;

  @ApiProperty()
  code: string;

  @ApiProperty()
  path: string;
}
