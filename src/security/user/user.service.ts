import { Injectable } from '@nestjs/common';
import { GenericUser } from './user.generic';
import { BuildGenericService } from '../../crud';

@Injectable()
export class GenericUserService extends BuildGenericService(GenericUser) {}
