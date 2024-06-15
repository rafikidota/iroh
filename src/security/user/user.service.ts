import {
  DefaultDto,
  FindOneOptions,
  GenericLogger,
  SearchPaginateDto,
} from '../../crud';
import { Repository, DeepPartial } from 'typeorm';
import { GenericUser } from './user.generic';

export class GenericUserService<
  User extends GenericUser,
  CreateUserDto extends DefaultDto = DefaultDto,
> {
  protected logger: GenericLogger;
  private context: string;
  constructor(
    protected readonly repository: Repository<User> & Repository<GenericUser>,
  ) {
    this.context = `${repository.metadata.name}Logger`;
    this.logger = new GenericLogger(this.context);
  }
  async create(createDto: DeepPartial<CreateUserDto>) {
    console.log(createDto);
  }

  async paginate(query: SearchPaginateDto) {
    console.log(query);
  }

  async findAll() {}

  async findOne(id: string, options: FindOneOptions) {
    console.log(id, options);
  }

  async update(entity: User, updateDto: Partial<CreateUserDto>) {
    console.log(entity, updateDto);
  }

  async remove(id: string) {
    console.log(id);
  }
}
