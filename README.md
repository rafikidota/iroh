# Iroh

Just my own nestjs utils library with blackjacks and hookers

<img 
alt="Iroh"
src = "https://github.com/rafikidota/assets/raw/main/iroh/iroh.jpg?raw=true" 
style="width:250px"/>

<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: Arial, sans-serif;
  }
  .tab {
    overflow: hidden;
    border-bottom: 1px solid #ccc;
  }
  .tab button {
    background-color: #f1f1f1;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
  }
  .tab button:hover {
    background-color: #ddd;
  }
  .tab button.active {
    background-color: #ccc;
  }
  .tabcontent {
    display: none;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-top: none;
  }
</style>
</head>
<body>

<div class="tab">
  <button class="tablinks" onclick="openTab(event, 'npm')">npm</button>
  <button class="tablinks" onclick="openTab(event, 'yarn')">yarn</button>
  <button class="tablinks" onclick="openTab(event, 'pnpm')">pnpm</button>
</div>

<div id="npm" class="tabcontent">
  <pre><code>npm install @rafikidota/iroh</code></pre>
</div>

<div id="yarn" class="tabcontent">
  <pre><code>yarn add @rafikidota/iroh</code></pre>
</div>

<div id="pnpm" class="tabcontent">
  <pre><code>pnpm add @rafikidota/iroh</code></pre>
</div>

<script>
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}
</script>

</body>
</html>


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
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';

@Module({
  controllers: [HeroController],
  providers: [
    HeroService,
    EntityMiddlewareFactory(HeroService),
    EntityMiddleware,
  ],
  imports: [TypeOrmModule.forFeature([Hero])],
  exports: [TypeOrmModule],
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
