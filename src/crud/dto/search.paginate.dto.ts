import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
// import { QueryForm } from '@guachos/nestjs-typeorm-meta-mapper';

export class SearchPaginateDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit: number = 10;

  // @ApiProperty()
  // @IsOptional()
  // form?: QueryForm;
  // @ApiProperty()
  // @IsOptional()
  // filter?: QueryForm;
  // @ApiProperty()
  // @IsOptional()
  // order?: string | string[];
}
