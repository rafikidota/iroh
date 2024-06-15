import {
  Injectable,
  NestMiddleware,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FindOneOptions } from '../../../crud';
import { CreateGenericUserDto } from '../dto';
import { GenericUser } from '../user.generic';
import { GenericUserService } from '../user.service';

@Injectable()
export class UserMiddleware<
  User extends GenericUser,
  CreateUserDto extends CreateGenericUserDto,
> implements NestMiddleware
{
  constructor(
    @Inject('USER_MIDDLEWARE')
    private readonly service: GenericUserService<User, CreateUserDto>,
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
