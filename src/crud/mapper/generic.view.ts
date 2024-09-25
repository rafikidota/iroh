import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class GenericView {
  @ApiProperty({
    example: uuid(),
  })
  id: string;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  updatedAt: Date;
}
