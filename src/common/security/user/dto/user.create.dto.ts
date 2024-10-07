import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';
import { UserRoleEnumType, UserTypeEnum } from '../enum';

export class CreateGenericUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Doe',
  })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john.doe',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john.doe@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    example: '*JohnDoe123!',
  })
  password: string;

  @ApiProperty({
    enum: UserTypeEnum,
    default: UserTypeEnum.CLIENT,
  })
  type: UserRoleEnumType;
}
