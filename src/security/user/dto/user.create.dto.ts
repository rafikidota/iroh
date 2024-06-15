import { IsString, IsEmail } from 'class-validator';
import { DefaultDto } from '../../../crud';

export class CreateGenericUserDto extends DefaultDto {
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
