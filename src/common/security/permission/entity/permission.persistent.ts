import { Column } from 'typeorm';
import { GenericPersistent } from '../../../../crud/mapper';
import {
  PermissionMethodEnum,
  PermissionMethodEnumType,
} from '../enum/permission.method.enum';
import {
  PermissionStatusEnum,
  PermissionStatusEnumType,
} from '../enum/permission.status.enum';

export class GenericPermission extends GenericPersistent {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: PermissionMethodEnum,
  })
  method: PermissionMethodEnumType;

  @Column()
  code: string;

  @Column()
  path: string;

  @Column({
    type: 'enum',
    enum: PermissionStatusEnum,
    default: PermissionStatusEnum.PENDING,
  })
  status: PermissionStatusEnumType;
}
