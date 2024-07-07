import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 1,
    minimum: 1,
    description: `What's the page number to start listing from`,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    default: 10,
    minimum: 1,
    description: 'How many rows do you need?',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({
    default: 0,
    minimum: 0,
    description: 'How many rows do you want to skip?',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
