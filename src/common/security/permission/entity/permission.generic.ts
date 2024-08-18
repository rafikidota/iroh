import { Column } from 'typeorm';
import { GenericPersistent } from '../../../../crud/entity/generic.persistent';
import { MethodPermission } from '../enum/method.permission.enum';

export class GenericPermission extends GenericPersistent {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    enum: MethodPermission,
  })
  method: string;

  @Column()
  code: string;
}
