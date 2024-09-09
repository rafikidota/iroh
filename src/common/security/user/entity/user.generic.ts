import { Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GenericPersistent } from '../../../../crud/entity/generic.persistent';
import { SoftUnique } from '../../../../crud/decorators/soft-unique.decorator';
import { RoleEnum } from '../enum/role.enum';

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
    enum: RoleEnum,
    default: RoleEnum.CLIENT,
  })
  role: string;

  public verifyPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
