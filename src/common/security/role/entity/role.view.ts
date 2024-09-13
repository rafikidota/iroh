import { ApiProperty } from '@nestjs/swagger';
import { GenericView } from '../../../../crud/mapper';

export class GenericRoleView extends GenericView {
  @ApiProperty({
    example: 'Moderator',
  })
  name: string;
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  description: string;
}
