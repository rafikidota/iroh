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

  private async hash(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }

  @BeforeInsert()
  async beforeInsertHook() {
    await this.hash(this.password);
  }

  @BeforeUpdate()
  async beforeUpdateHook() {
    await this.hash(this.password);
  }
}
