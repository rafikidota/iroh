import { BuildGenericController } from '../../crud';
import { GenericUser } from './user.generic';
import { GenericUserService } from './user.service';

export function BuildGenericUserController() {
  class GenericUserController extends BuildGenericController(GenericUser) {
    constructor(readonly service: GenericUserService) {
      super(service);
    }
  }
  return GenericUserController;
}
