import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, BuildGenericController } from '@rafikidota/iroh';
import { <%= classify(name) %>Service } from './<%= lowerCase(name) %>.service';
import { <%= classify(name) %> } from './entities/<%= lowerCase(name) %>.entity';

@Auth()
@ApiBearerAuth()
@ApiTags(<%= classify(name) %>.name)
@Controller(<%= classify(name) %>.name.toLowerCase())
export class <%= classify(name) %>Controller extends BuildGenericController(<%= classify(name) %>) {
  constructor(readonly service: <%= classify(name) %>Service) {
    super(service);
  }
}
