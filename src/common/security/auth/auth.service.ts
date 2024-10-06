import {
  BadRequestException,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { IGenericAuthService, ISignInResponse } from './interfaces';
import { GenericUser } from '../user/entity';
import { GenericLogger } from './../../../crud';
import { Payload } from './interfaces/payload';

export function GenericAuthService<
  T extends GenericUser,
  DTO extends DeepPartial<T>,
>(E: Type<T>) {
  class GenericAuthService implements IGenericAuthService<T> {
    public readonly logger: GenericLogger;
    constructor(
      @InjectRepository(E)
      readonly repository: Repository<T>,
      readonly jwtService: JwtService,
    ) {
      this.logger = new GenericLogger(this.constructor.name);
    }
    public async signup(createDTO: DTO): Promise<Partial<T>> {
      const { email, username } = createDTO;
      const options = {
        where: [{ email }, { username }],
      } as unknown as FindOneOptions<T>;
      const found = await this.repository.findOne(options);
      if (found) {
        throw new BadRequestException('User already exists');
      }
      const user = this.repository.create(createDTO);
      user.hashPassword();
      const updatedUser = await this.repository.save(user);
      return updatedUser;
    }

    public async signin(user: T): Promise<ISignInResponse> {
      const { id } = user;
      const payload: Payload = { id };
      const token = this.jwtService.sign(payload);
      const found = await this.findUser(id);
      const response: ISignInResponse = { token, user: found };
      return response;
    }
    public async signout(payload: Payload): Promise<void> {
      const { id } = payload;
      const found = await this.findUser(id);
      if (!found) {
        throw new UnauthorizedException();
      }
    }

    public async findUser(id: string): Promise<T> {
      const where = { where: { id } } as unknown as FindOneOptions<T>;
      return await this.repository.findOne(where);
    }
  }
  return GenericAuthService;
}
