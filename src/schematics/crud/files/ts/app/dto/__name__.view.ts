import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { GenericView } from '@rafikidota/iroh';
import { Create<%= classify(name) %>Dto } from '../app/dto/<%= lowerCase(name) %>.create.dto';
import { <%= classify(name) %>Domain, I<%= classify(name) %> } from '../domain';

export class <%= classify(name) %>View
  extends OmitType(
    IntersectionType(PartialType(Create<%= classify(name) %>Dto), GenericView),
    [],
  )
  implements I<%= classify(name) %>
{
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(domain: <%= classify(name) %>Domain) {
    super(domain);
    this.id = domain.id;
    this.createdAt = domain.createdAt;
    this.updatedAt = domain.updatedAt;
  }
}
