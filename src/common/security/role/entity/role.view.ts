import { ApiProperty } from '@nestjs/swagger';
import { GenericView } from '../../../../crud/mapper';

export class GenericRoleView extends GenericView {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}
