import { GenericDomain } from '../../../../crud/mapper';
import { MethodPermissionType } from '../enum';

export class GenericPermissionDomain extends GenericDomain {
  name: string;
  description: string;
  method: MethodPermissionType;
  code: string;
  path: string;
}
