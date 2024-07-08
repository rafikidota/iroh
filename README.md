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
npx nest g -c @rafikidota/iroh crud <module-name> <destination-path>
```

## 4. Output files
### Entity
Define your entity by extending `GenericPersistent`:
```ts
import { Column, Entity } from 'typeorm';
import { GenericPersistent } from '@rafikidota/iroh';

@Entity()
export class Hero extends GenericPersistent {
  @Column()
  name: string;
}
```

### Controller
Define your controller by extending `GenericController`:
```js
import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, GenericController } from '@rafikidota/iroh';
import { HeroService } from './hero.service';
import { Hero } from './entities/hero.entity';
import { CreateHeroDto } from './dto/hero.create.dto';
import { UpdateHeroDto } from './dto/hero.update.dto';

@Auth()
@ApiBearerAuth()
@ApiTags(Hero.name)
@Controller(Hero.name.toLowerCase())
export class HeroController extends GenericController(
  Hero,
  CreateHeroDto,
  UpdateHeroDto,
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
import { Hero } from './entities/hero.entity';
import { HeroRepository } from './hero.repository';

@Injectable()
export class HeroService extends GenericService(Hero) {
  constructor(readonly repo: HeroRepository) {
    super(repo);
  }
}
```

### Repository
Define your repository by extending `GenericRepository`:
```ts
import { Injectable } from '@nestjs/common';
import { GenericRepository } from '@rafikidota/iroh';
import { Hero } from './entities/hero.entity';

@Injectable()
export class HeroRepository extends GenericRepository(Hero) {}

```

### Module
Import necessary modules and set up your feature module:
```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../common/security/auth/auth.module';
import { Hero } from './entities/hero.entity';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { HeroRepository } from './hero.repository';

@Module({
  controllers: [HeroController],
  providers: [HeroService, HeroRepository],
  imports: [TypeOrmModule.forFeature([Hero]), AuthModule],
  exports: [TypeOrmModule],
})
export class HeroModule {}
```

## Additional Resources
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Nestjs Iroh example on GitHub](https://github.com/rafikidota/nestjs-iroh/)