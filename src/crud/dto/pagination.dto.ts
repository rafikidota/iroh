import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    minimum: 1,
    description: `What's the page number to start listing from`,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Min(1)
  page?: number;

  @ApiProperty({
    minimum: 1,
    description: 'How many rows do you need?',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Min(1)
  limit?: number;

  @ApiProperty({
    minimum: 1,
    description: 'How many rows do you want to skip?',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @Min(1)
  offset?: number;
}
