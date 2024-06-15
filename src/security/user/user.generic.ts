import { GenericPersistentEntity } from 'src/crud';
import { Column } from 'typeorm';

export class GenericUser extends GenericPersistentEntity {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
