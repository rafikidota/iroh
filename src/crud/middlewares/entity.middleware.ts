import { Request, Response, NextFunction } from 'express';
import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { DefaultDto } from '../dto';
import { GenericPersistentEntity } from '../entity';
import { GenericService } from '../services';

@Injectable()
export class EntityMiddleware<
  Entity extends GenericPersistentEntity,
  GenericDto extends DefaultDto,
> implements NestMiddleware
{
  private service: GenericService<Entity, GenericDto>;

  constructor(private moduleRef: ModuleRef) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!this.service) {
      const entityService =
        await this.moduleRef.resolve<GenericService<Entity, GenericDto>>(
          'ENTITY_SERVICE',
        );
      this.service = entityService;
    }

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
