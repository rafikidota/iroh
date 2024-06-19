import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  InternalServerErrorException,
  Type,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BuildEntityGuard<T> implements CanActivate {
  constructor(
    @InjectRepository((): Type<T> => {
      return {} as Type<T>;
    })
    protected repository: Repository<T>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { id } = req.params;

    try {
      const entity = await this.repository.findOne(id);

      if (!entity) {
        throw new NotFoundException(
          `${this.repository.metadata.name} with id ${id} not found`,
        );
      }

      req.entity = entity;
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error while loading entity');
    }
  }
}
