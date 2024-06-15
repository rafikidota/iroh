import { GenericPersistentEntity } from 'src/crud';
import { SoftUnique } from '../../crud/decorators';
import { Column } from 'typeorm';

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
}
