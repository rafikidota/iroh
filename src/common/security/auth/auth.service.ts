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
import { GenericUser, UserTypeEnum } from '../user';
import { GenericLogger } from './../../../crud';
import { Payload } from './interfaces/payload';

export function GenericAuthService<
  T extends GenericUser,
  DTO extends DeepPartial<T>,
>(E: Type<T>) {
  class GenericAuthService implements IGenericAuthService<T, DTO> {
    public readonly logger: GenericLogger;
    constructor(
      @InjectRepository(E)
      readonly repository: Repository<T>,
      readonly jwtService: JwtService,
    ) {
      this.logger = new GenericLogger(this.constructor.name);
    }
    public async signup(createDTO: DTO): Promise<Partial<T>> {
      const { email, username, type } = createDTO;
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
      const user = this.repository.create(createDTO);
      user.hashPassword();
      const saved = await this.repository.save(user);
      return saved;
    }

    public async signin(user: T): Promise<IAuthResponse> {
      const { id } = user;
      const payload: Payload = { id };
      const token = this.jwtService.sign(payload);
      const where = { where: { id } } as unknown as FindOneOptions<T>;
      const found = await this.findUser(where);
      const response: IAuthResponse = { token, user: found };
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
