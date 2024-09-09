import { Column } from 'typeorm';
import { GenericPersistent } from '../../../../crud/entity/generic.persistent';
import { MethodPermission } from '../enum/method.permission.enum';

export class GenericPermission extends GenericPersistent {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: MethodPermission,
  })
  method: MethodPermission;

  @Column()
  code: string;

  @Column()
  path: string;
}
