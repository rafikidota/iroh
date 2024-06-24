import { IsString, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { GenericPersistentEntity } from '../../../crud';

export class CreateGenericUserDto extends PartialType(GenericPersistentEntity) {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
