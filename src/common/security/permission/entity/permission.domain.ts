import { GenericDomain } from '../../../../crud/mapper';
import { PermissionMethodEnumType } from '../enum';

export class GenericPermissionDomain extends GenericDomain {
  name: string;
  description: string;
  method: PermissionMethodEnumType;
  code: string;
  path: string;
}
