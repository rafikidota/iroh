import { Column } from 'typeorm';
import { GenericPersistent } from '../../../../crud/mapper';
import { RoleStatusEnum, RoleStatusEnumType } from '../enum/role.status.enum';

export class GenericRole extends GenericPersistent {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: RoleStatusEnum,
    default: RoleStatusEnum.PENDING,
  })
  status: RoleStatusEnumType;
}
