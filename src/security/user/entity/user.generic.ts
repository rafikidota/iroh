import { Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GenericPersistentEntity } from '../../../crud';
import { SoftUnique } from '../../../crud/decorators';

export class GenericUser extends GenericPersistentEntity {
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
    console.log('Hashing password...', {
      password,
      pass: this.password,
    });
    return bcrypt.compare(password, this.password);
  }

  public hashPassword() {
    console.log('Hashing password...', this.password);
    this.password = bcrypt.hashSync(this.password, 10);
    console.log('Password hashed:', this.password);
  }
}
