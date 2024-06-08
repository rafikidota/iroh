import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DefaultDto } from '../dto/default.dto';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { GenericService } from '../services/generic.service';

@Injectable()
export class GetEntityMiddleware<
  Entity extends GenericPersistentEntity,
  GenericDto extends DefaultDto,
> implements NestMiddleware
{
  constructor(
    @Inject('ENTITY_SERVICE')
    private readonly service: GenericService<Entity, GenericDto>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestException('id is required');
    }
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException(`${entity.constructor.name} not found`);
    }
    Object.assign(req, { entity });
    next();
  }
}
