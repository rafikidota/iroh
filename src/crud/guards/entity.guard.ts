import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GenericService } from '../services/generic.service';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { DefaultDto } from '../dto/default.dto';
import { FindOneOptions } from '../services';

@Injectable()
export class EntityGuard<
  Entity extends GenericPersistentEntity,
  GenericDto extends DefaultDto,
> implements CanActivate
{
  constructor(
    private readonly reflector: Reflector,
    @Inject('GENERIC_SERVICE')
    private readonly service: GenericService<Entity, GenericDto>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { id } = req.params;
    if (!id) {
      throw new BadRequestException('id is required');
    }
    const options: FindOneOptions = { logging: false };
    const entity = await this.service.findOne(id, options);
    console.log({ location: 'EntityGuard', entity });

    Object.assign(req, { entity });
    return true;
  }
}
