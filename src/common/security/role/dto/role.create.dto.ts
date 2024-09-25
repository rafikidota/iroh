import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenericRoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Moderator',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  description: string;
}
