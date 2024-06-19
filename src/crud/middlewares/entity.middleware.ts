import {
  Injectable,
  NestMiddleware,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { GenericService } from '../services/generic.service';
import { LoggerOptions } from '../services';
import { DeepPartial } from 'typeorm';

@Injectable()
export class EntityMiddleware<
  Entity extends GenericPersistentEntity,
  GenericDto extends DeepPartial<Entity>,
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
    const options: LoggerOptions = { logging: false };
    const entity = await this.service.findOne(id, options);
    Object.assign(req, { entity });
    next();
  }
}
