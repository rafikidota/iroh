import { Column } from 'typeorm';
import { GenericPersistent } from '../../../../crud/entity/generic.persistent';

export class GenericRole extends GenericPersistent {
  @Column()
  name: string;

  @Column()
  description: string;
}
