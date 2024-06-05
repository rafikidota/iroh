import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import { SearchPaginateDto } from '../dto/search.paginate.dto';

export class GenericService<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>) {}

  create(createDto: DeepPartial<T>) {
    return this.repository.save(createDto);
  }

  paginate(query: SearchPaginateDto) {
    return this.repository.find({
      take: query.limit,
      skip: (query.page - 1) * query.limit,
    });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    console.log(id);
    return this.repository.findOne({ where: {} });
  }

  update(id: string, updateDto: Partial<T>) {
    return this.repository.update(id, updateDto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
``;
