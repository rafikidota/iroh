# Iroh
 Just my own nestjs utils library with blackjacks and hookers

<img 
alt="Iroh"
src = "https://github.com/rafikidota/assets/raw/main/iroh/iroh.jpg?raw=true" 
style="width:250px"/>

## npm
```bash
npm install @rafikidota/iroh
```

## yarn
```bash
yarn add @rafikidota/iroh
```
## pnpm
```bash
pnpm add @rafikidota/iroh
```

## Using iroh with Nestjs
The following TypeScript code snippet illustrates an example of using the iroh library within the Nestjs framework. This code establishes a basic Nestjs CRUD and highlights how to implement iroh in your Nestjs project.

## Entity
```ts
import { Column, Entity } from 'typeorm';
import { GenericPersistentEntity } from '@rafikidota/iroh';

@Entity()
export class Hero extends GenericPersistentEntity {
  @Column()
  name: string;
}
```

## Controller
```js
import { Controller } from '@nestjs/common';
import { GenericController } from '@rafikidota/iroh';
import { Hero } from './entities/hero.entity';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';

@Controller('hero')
export class HeroController extends GenericController<Hero, CreateHeroDto> {
  constructor(private readonly hero: HeroService) {
    super(hero);
  }
}
```

## Service
```ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from '@rafikidota/iroh';
import { Hero } from './entities/hero.entity';
import { CreateHeroDto } from './dto/create-hero.dto';

@Injectable()
export class HeroService extends GenericService<Hero, CreateHeroDto> {
  constructor(
    @InjectRepository(Hero)
    private repo: Repository<Hero>,
  ) {
    super(repo);
  }
}
```
## Module
```ts
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { EntityMiddleware, EntityMiddlewareFactory } from '@rafikidota/iroh';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';
import { ModuleRef } from '@nestjs/core';

@Module({
  controllers: [HeroController],
  providers: [
    HeroService,
    EntityMiddlewareFactory(HeroService),
    EntityMiddleware,
  ],
  imports: [TypeOrmModule.forFeature([Hero])],
  exports: [TypeOrmModule, ModuleRef],
})
export class HeroModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EntityMiddleware)
      .forRoutes(
        { path: 'hero/:id', method: RequestMethod.PATCH },
        { path: 'hero/:id', method: RequestMethod.DELETE },
      );
  }
}
```


Explore the code example on GitHub [here](https://github.com/rafikidota/nestjs-iroh/)