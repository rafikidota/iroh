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
    const entity = await this.service.findOne(id);
    Object.assign(req, { entity });
    next();
  }
}
