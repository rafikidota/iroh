# Iroh

Sometimes, the best way to solve your own problems is to help someone else.

<img 
alt="Iroh"
src = "https://github.com/rafikidota/assets/raw/main/iroh/iroh.jpg?raw=true" 
style="width:250px"/>

## Using Iroh with Nestjs

The following TypeScript code snippet illustrates an example of using the Iroh library within the Nestjs framework. This code establishes a basic Nestjs CRUD and highlights how to implement Iroh in your Nestjs project.

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
import { HeroService } from './hero.service';
import { Hero } from './entities/hero.entity';

@Controller('hero')
export class HeroController extends GenericController(Hero) {
  constructor(readonly service: HeroService) {
    super(service);
  }
}
```

## Service

```ts
import { Injectable } from '@nestjs/common';
import { GenericService } from '@rafikidota/iroh';
import { Hero } from './entities/hero.entity';

@Injectable()
export class HeroService extends GenericService(Hero) {}
```

## Module

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';

@Module({
  controllers: [HeroController],
  providers: [HeroService],
  imports: [TypeOrmModule.forFeature([Hero])],
  exports: [TypeOrmModule],
})
export class HeroModule {}
```

Explore the code example on GitHub [here](https://github.com/rafikidota/nestjs-iroh/)
