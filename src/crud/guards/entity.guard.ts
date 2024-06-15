import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { GenericService } from '../services/generic.service';
import { GenericPersistentEntity } from '../entity/generic.persistent.entity';
import { DefaultDto } from '../dto/default.dto';

@Injectable()
export class EntityGuard<
  Entity extends GenericPersistentEntity,
  GenericDto extends DefaultDto,
> implements CanActivate
{
  constructor(private readonly service: GenericService<Entity, GenericDto>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { id } = req.params;
    if (!id) {
      throw new BadRequestException('id is required');
    }
    const entity = await this.service.findOne(id, { logging: false });
    Object.assign(req, { entity });
    return true;
  }
}
