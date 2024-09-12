import { Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GenericPersistent } from '../../../../crud/mapper';
import { SoftUnique } from '../../../../crud/decorators/soft-unique.decorator';
import { UserRoleEnum, UserRoleEnumType } from '../enum/user.role.enum';

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
    enum: UserRoleEnum,
    default: UserRoleEnum.CLIENT,
  })
  type: UserRoleEnumType;

  public verifyPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
