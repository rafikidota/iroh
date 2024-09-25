import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import {
  PermissionMethodEnum,
  PermissionMethodEnumType,
} from '../enum/permission.method.enum';

export class CreateGenericPermissionDto {
  @IsString()
  @ApiProperty({
    example: 'Create user',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(PermissionMethodEnum)
  @ApiProperty({
    enum: PermissionMethodEnum,
    example: PermissionMethodEnum.POST,
  })
  method: PermissionMethodEnumType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'UserController_create' })
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '/v1/user' })
  path: string;
}
