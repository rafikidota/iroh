import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GenericController, SecurityGuard } from '@rafikidota/iroh';
import { Permission } from '../../common/security/permission';
import { <%= classify(name) %>Service } from './<%= lowerCase(name) %>.service';
import { <%= classify(name) %>Persistent } from './entities/<%= lowerCase(name) %>.entity';
import { Create<%= classify(name) %>Dto } from './dto/<%= lowerCase(name) %>.create.dto';
import { Update<%= classify(name) %>Dto } from './dto/<%= lowerCase(name) %>.update.dto';
import { <%= classify(name) %>View } from './entities/<%= lowerCase(name) %>.view';

@ApiBearerAuth()
@ApiTags('<%= classify(name) %>')
@Controller('<%= dasherize(name) %>')
@SecurityGuard(Permission)
export class <%= classify(name) %>Controller extends GenericController(
  <%= classify(name) %>Persistent,
  Create<%= classify(name) %>Dto,
  Update<%= classify(name) %>Dto,
  <%= classify(name) %>View,
) {
  constructor(readonly service: <%= classify(name) %>Service) {
    super(service);
  }
}
