import {
  Injectable,
  NestMiddleware,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FindOneOptions, GenericService } from '../../../crud';
import { CreateGenericUserDto } from '../dto';
import { GenericUser } from '../user.generic';

@Injectable()
export class EntityMiddleware<
  User extends GenericUser,
  GenericDto extends CreateGenericUserDto,
> implements NestMiddleware
{
  constructor(
    @Inject('USER_MIDDLEWARE')
    private readonly service: GenericService<User, GenericDto>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestException('id is required');
    }
    const options: FindOneOptions = { logging: false };
    const user = await this.service.findOne(id, options);
    Object.assign(req, { user });
    next();
  }
}
