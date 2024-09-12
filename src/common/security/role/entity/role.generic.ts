import { Column } from 'typeorm';
import { GenericPersistent } from '../../../../crud/mapper';

export class GenericRole extends GenericPersistent {
  @Column()
  name: string;

  @Column()
  description: string;
}
