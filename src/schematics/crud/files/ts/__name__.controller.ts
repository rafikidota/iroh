import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, GenericController } from '@rafikidota/iroh';
import { <%= classify(name) %>Service } from './<%= lowerCase(name) %>.service';
import { <%= classify(name) %> } from './entities/<%= lowerCase(name) %>.entity';
import { Create<%= classify(name) %>Dto } from './dto/<%= lowerCase(name) %>.create.dto';
import { Update<%= classify(name) %>Dto } from './dto/<%= lowerCase(name) %>.update.dto';

@Auth()
@ApiBearerAuth()
@ApiTags(<%= classify(name) %>.name)
@Controller(<%= classify(name) %>.name.toLowerCase())
export class <%= classify(name) %>Controller extends GenericController(
  <%= classify(name) %>,
  Create<%= classify(name) %>Dto,
  Update<%= classify(name) %>Dto,
) {
  constructor(readonly service: <%= classify(name) %>Service) {
    super(service);
  }
}
