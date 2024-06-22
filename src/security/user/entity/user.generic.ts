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
    return bcrypt.compare(password, this.password);
  }

  protected async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  public async beforeInsert() {
    await this.hashPassword();
  }

  @BeforeUpdate()
  public async beforeUpdate() {
    if (this.password) {
      await this.hashPassword();
    }
  }
}
