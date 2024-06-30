import { Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GenericPersistent } from '../../../../crud';
import { SoftUnique } from '../../../../crud/decorators';

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

  public verifyPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
