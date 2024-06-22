import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
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

  public async hashPassword() {
    console.log('Hashing password...', this.password);
    this.password = await bcrypt.hash(this.password, 10);
    console.log('Password hashed:', this.password);
  }

  @BeforeInsert()
  public async beforeInsert() {
    console.log('Before insert hook');
    await this.hashPassword();
  }

  @BeforeUpdate()
  public async beforeUpdate() {
    console.log('Before update hook');
    if (this.password) {
      await this.hashPassword();
    }
  }
}
