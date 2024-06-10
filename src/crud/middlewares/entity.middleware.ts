import {
  Injectable,
  NestMiddleware,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DefaultDto } from '../dto/default.dto';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { GenericService } from '../services/generic.service';
import { FindOneOptions } from '../services';

@Injectable()
export class EntityMiddleware<
  Entity extends GenericPersistentEntity,
  GenericDto extends DefaultDto,
> implements NestMiddleware
{
  constructor(
    @Inject('ENTITY_MIDDLEWARE')
    private readonly service: GenericService<Entity, GenericDto>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestException('id is required');
    }
    const options: FindOneOptions = { logging: false };
    const entity = await this.service.findOne(id, options);
    Object.assign(req, { entity });
    next();
  }
}
