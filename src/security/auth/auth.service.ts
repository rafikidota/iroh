import { GenericLogger } from '../../crud';
import { Repository } from 'typeorm';
import { GenericUser } from '../user';

export class GenericAuthService<User extends GenericUser> {
  protected logger: GenericLogger;
  private context: string;
  constructor(
    protected readonly repository: Repository<User> & Repository<GenericUser>,
  ) {
    this.context = `${repository.metadata.name}Logger`;
    this.logger = new GenericLogger(this.context);
  }
  async signup() {}

  async signin() {}

  async signout() {}
}
