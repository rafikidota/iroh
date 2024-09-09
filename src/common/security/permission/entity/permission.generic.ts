import { Column } from 'typeorm';
import { GenericPersistent } from '../../../../crud/entity/generic.persistent';
import { MethodPermissionEnum, MethodPermissionType } from '../enum';

export class GenericPermission extends GenericPersistent {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: MethodPermissionEnum,
  })
  method: MethodPermissionType;

  @Column()
  code: string;

  @Column()
  path: string;
}
