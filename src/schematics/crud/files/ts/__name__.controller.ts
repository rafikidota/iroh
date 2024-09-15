import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GenericController, SecurityGuard } from '@rafikidota/iroh';
import { PermissionPersistent } from '../../common/security/permission';
import { <%= classify(name) %>Service } from './<%= lowerCase(name) %>.service';
import { <%= classify(name) %>Persistent } from './infra/<%= lowerCase(name) %>.persistent';
import { Create<%= classify(name) %>Dto, Update<%= classify(name) %>Dto } from './app/dto';
import { <%= classify(name) %>View } from './infra/<%= lowerCase(name) %>.view';

@ApiBearerAuth()
@ApiTags('<%= classify(name) %>')
@Controller('<%= dasherize(name) %>')
@SecurityGuard(PermissionPersistent)
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
