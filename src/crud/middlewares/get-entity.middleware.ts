import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DefaultDto } from '../dto';
import { GenericPersistentEntity } from '../entity';
import { GenericService } from '../services';

@Injectable()
export class GetEntityMiddleware<
  T extends GenericPersistentEntity,
  D extends DefaultDto,
> implements NestMiddleware
{
  constructor(private readonly service: GenericService<T, D>) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException(`${entity.constructor.name} not found`);
    }
    Object.assign(req, { entity });
    next();
  }
}
