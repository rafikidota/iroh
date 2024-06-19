# Iroh

Just my own nestjs utils library with blackjacks and hookers

<img 
alt="Iroh"
src = "https://github.com/rafikidota/assets/raw/main/iroh/iroh.jpg?raw=true" 
style="width:250px"/>

```bash
npm install @rafikidota/iroh
```

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
import { BuildCRUDController } from '@rafikidota/iroh';
import { HeroService } from './hero.service';
import { Hero } from './entities/hero.entity';

@Controller('hero')
export class HeroController extends BuildCRUDController(Hero) {
  constructor(private readonly hero: HeroService) {
    super(hero);
  }
}
```

## Service

```ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';

@Module({
  controllers: [HeroController],
  providers: [HeroService],
  imports: [TypeOrmModule.forFeature([Hero])],
  exports: [TypeOrmModule],
})
export class HeroModule {}
```

Explore the code example on GitHub [here](https://github.com/rafikidota/nestjs-iroh/)
