import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { GenericUserView, UserRoleEnumType } from '@rafikidota/iroh';
import { CreateUserDto } from '../app/dto/user.create.dto';
import { UserDomain } from '../domain/user.domain';

export class UserView extends OmitType(
  IntersectionType(PartialType(CreateUserDto), GenericUserView),
  ['password'],
) {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  type: UserRoleEnumType;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(domain: UserDomain) {
    super(domain);
    this.id = domain.id;
    this.name = domain.name;
    this.lastName = domain.lastName;
    this.username = domain.username;
    this.email = domain.email;
    this.type = domain.type;
    this.createdAt = domain.createdAt;
    this.updatedAt = domain.updatedAt;
  }
}
