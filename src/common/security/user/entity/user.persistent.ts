import { Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GenericPersistent } from '../../../../crud/mapper';
import { SoftUnique } from '../../../../crud/decorators/soft-unique.decorator';
import { UserTypeEnum, UserRoleEnumType } from '../enum/user.role.enum';
import { UserStatusEnum, UserStatusEnumType } from '../enum/user.status.enum';

export class GenericUser extends GenericPersistent {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  @SoftUnique()
  username: string;

  @Column()
  @SoftUnique()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserTypeEnum,
    default: UserTypeEnum.CLIENT,
  })
  type: UserRoleEnumType;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.PENDING,
  })
  status: UserStatusEnumType;

  public verifyPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
