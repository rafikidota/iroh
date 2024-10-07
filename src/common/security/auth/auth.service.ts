import {
  BadRequestException,
  ForbiddenException,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { IGenericAuthService, IAuthResponse } from './interfaces';
import {
  CreateGenericUserDto,
  GenericUser,
  GenericUserDomain,
  GenericUserView,
  UserTypeEnum,
} from '../user';
import { GenericLogger, IEntityMapper } from './../../../crud';
import { Payload } from './interfaces/payload';

export function GenericAuthService<
  T extends GenericUser,
  D extends GenericUserDomain,
  V extends GenericUserView,
  M extends IEntityMapper<T, D, V>,
  DTO extends CreateGenericUserDto,
  R extends IAuthResponse<V>,
>(E: Type<T>, Mapper: Type<M>) {
  class GenericAuthService implements IGenericAuthService<T, DTO, V, R> {
    public readonly logger: GenericLogger;
    public readonly mapper: M;

    constructor(
      @InjectRepository(E)
      readonly repository: Repository<T>,
      readonly jwtService: JwtService,
    ) {
      this.logger = new GenericLogger(this.constructor.name);
      this.mapper = new Mapper();
    }
    public async signup(dto: DTO): Promise<R> {
      const { email, username, type } = dto;
      if (type && type !== UserTypeEnum.CLIENT) {
        throw new ForbiddenException();
      }
      const where = {
        where: [{ email }, { username }],
      } as unknown as FindOneOptions<T>;
      const found = await this.findUser(where);
      if (found) {
        if (found.email === email) {
          const message = `User already exists with ${email} email`;
          throw new BadRequestException(message);
        }
        if (found.username === username) {
          const message = `User already exists with ${username} username`;
          throw new BadRequestException(message);
        }
      }
      const user = this.repository.create(dto as unknown as DeepPartial<T>);
      user.hashPassword();
      const entity = await this.repository.save(user);
      const domain = this.mapper.PersistToDomain(entity);
      const view = this.mapper.DomainToView(domain);
      const { id } = view;
      const payload: Payload = { id };
      const token = this.jwtService.sign(payload);
      const response = { token, user: view } as unknown as R;
      return response;
    }

    public async signin(user: T): Promise<R> {
      const { id } = user;
      const where = { where: { id } } as unknown as FindOneOptions<T>;
      const entity = await this.findUser(where);
      const domain = this.mapper.PersistToDomain(entity);
      const view = this.mapper.DomainToView(domain);
      const payload: Payload = { id };
      const token = this.jwtService.sign(payload);
      const response = { token, user: view } as unknown as R;
      return response;
    }
    public async signout(user: T): Promise<void> {
      const { id } = user;
      const where = { where: { id } } as unknown as FindOneOptions<T>;
      const found = await this.findUser(where);
      if (!found) {
        throw new UnauthorizedException();
      }
    }

    public async findUser(where: FindOneOptions<T>): Promise<T> {
      return await this.repository.findOne(where);
    }
  }
  return GenericAuthService;
}
