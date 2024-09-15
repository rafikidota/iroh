# Iroh

Sometimes, the best way to solve your own problems is to help someone else.

<img 
alt="Iroh"
src = "https://github.com/rafikidota/assets/raw/main/iroh/iroh.jpg?raw=true" 
style="width:250px"/>

## Using Iroh with Nestjs

The following TypeScript code snippet illustrates an example of using the Iroh library within the Nestjs framework. This code establishes a basic Nestjs CRUD and highlights how to implement Iroh in your Nestjs project.

## Prerequisites
Before using the schematics, ensure you have the following:
- A NestJS project set up
- TypeORM configured
- Necessary dependencies installed

## Step-by-Step Guide

## 1. Generate Basic Modules
Run the following command to generate the `core`, `common` and `security` modules:
```sh
npx nest g -c @rafikidota/iroh init 
```

## 2. Import Basic Modules on AppModule

```ts
import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { CoreModule } from './modules/core.module';
@Module({
  imports: [
    //... some other imports
    CommonModule,
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## 3. Generate CRUD Module
Run the following command to generate a new `CRUD` module:
```sh
npx nest g -c @rafikidota/iroh crud <module-name>
```

## 4. Output files

### Module
Import necessary modules and set up your feature module:
```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from '../../common/security/security.module';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { HeroRepository } from './infra/hero.repository';
import { HeroPersistent } from './infra/hero.persistent';

@Module({
  controllers: [HeroController],
  providers: [HeroService, HeroRepository],
  imports: [TypeOrmModule.forFeature([HeroPersistent]), SecurityModule],
  exports: [TypeOrmModule],
})
export class HeroModule {}
```

### Controller
Define your controller by extending `GenericController`:
```js
import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GenericController, SecurityGuard } from '@rafikidota/iroh';
import { PermissionPersistent } from '../../common/security/permission';
import { HeroService } from './hero.service';
import { HeroPersistent } from './infra/hero.persistent';
import { CreateHeroDto, UpdateHeroDto } from './app/dto';
import { HeroView } from './infra/hero.view';

@ApiBearerAuth()
@ApiTags('Hero')
@Controller('hero')
@SecurityGuard(PermissionPersistent)
export class HeroController extends GenericController(
  HeroPersistent,
  CreateHeroDto,
  UpdateHeroDto,
  HeroView,
) {
  constructor(readonly service: HeroService) {
    super(service);
  }
}
```

### Service
Define your service by extending `GenericService`:
```ts
import { Injectable } from '@nestjs/common';
import { GenericService } from '@rafikidota/iroh';
import { HeroRepository } from './infra/hero.repository';
import { HeroPersistent } from './infra/hero.persistent';
import { HeroMapper } from './infra/hero.mapper';

@Injectable()
export class HeroService extends GenericService(HeroPersistent, HeroMapper) {
  constructor(readonly repository: HeroRepository) {
    super(repository);
  }
}
```

### Repository
Define your repository by extending `GenericTypeOrmRepository`:
```ts
import { Injectable } from '@nestjs/common';
import { GenericTypeOrmRepository } from '@rafikidota/iroh';
import { HeroPersistent } from './hero.persistent';

@Injectable()
export class HeroRepository extends GenericTypeOrmRepository(HeroPersistent) {}
```

### Persistent
Define your persistent by extending `GenericPersistent`:
```ts
import { Column, Entity } from 'typeorm';
import { GenericPersistent } from '@rafikidota/iroh';

@Entity('hero')
export class HeroPersistent extends GenericPersistent {
  @Column()
  name: string;
}
```

### Domain
Define your domain by extending `GenericDomain`:
```ts
import { GenericDomain } from '@rafikidota/iroh';
import { HeroPersistent } from '../infra/hero.persistent';

export class HeroDomain extends GenericDomain {
  name: string;

  constructor(persistent: HeroPersistent) {
    super();
    this.id = persistent.id;
    this.name = persistent.name;
    this.createdAt = persistent.createdAt;
    this.updatedAt = persistent.updatedAt;
    this.deletedAt = persistent.deletedAt;
  }
}
```

### View
Define your view by extending `OmitType` from the `IntersectionType` of `PartialType(CreateHeroDto)` and `GenericView`:
```ts
import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { GenericView } from '@rafikidota/iroh';
import { CreateHeroDto } from '../app/dto/hero.create.dto';
import { HeroDomain } from '../domain/hero.domain';

export class HeroView extends OmitType(
  IntersectionType(PartialType(CreateHeroDto), GenericView),
  [],
) {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(domain: HeroDomain) {
    super(domain);
    this.id = domain.id;
    this.name = domain.name;
    this.createdAt = domain.createdAt;
    this.updatedAt = domain.updatedAt;
  }
}
```

### Mapper
Define your mapper by extending `GenericEntityMapper`:
```ts
import { GenericEntityMapper, IEntityMapper } from '@rafikidota/iroh';
import { HeroPersistent } from './hero.persistent';
import { HeroDomain } from '../domain/hero.domain';
import { HeroView } from './hero.view';

export class HeroMapper
  extends GenericEntityMapper(HeroPersistent, HeroDomain, HeroView)
  implements IEntityMapper<HeroPersistent, HeroDomain, HeroView>
{
  PersistToDomain(persistent: HeroPersistent): HeroDomain {
    return new HeroDomain(persistent);
  }

  DomainToPersist(domain: HeroDomain): HeroPersistent {
    const persistent = {
      id: domain.id,
      name: domain.name,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt,
    } as unknown as HeroPersistent;
    return persistent;
  }

  DomainToView(domain: HeroDomain): HeroView {
    return new HeroView(domain);
  }
}
```

## Additional Resources
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Nestjs Iroh example on GitHub](https://github.com/rafikidota/nestjs-iroh/)