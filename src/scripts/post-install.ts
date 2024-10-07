import { execSync } from 'child_process';
import { existsSync } from 'fs';

try {
  const packageManagers: { [key: string]: string } = {
    'yarn.lock': 'yarn',
    'package-lock.json': 'npm',
    'pnpm-lock.yaml': 'pnpm',
    'bun.lockb': 'bun',
  };

  const pm: { name: string } = { name: 'npm' };

  for (const [file, manager] of Object.entries(packageManagers)) {
    if (existsSync(file)) {
      pm.name = manager;
      break;
    }
  }

  const deps =
    '@nestjs/swagger @nestjs/typeorm typeorm @nestjs/config jsonwebtoken uuid joi pg';

  const success = 'Dependencies installed successfully';

  switch (pm.name) {
    case 'yarn': {
      const message = `yarn add ${deps} --save`;
      execSync(message, { stdio: 'inherit' });
      console.log(success);
      break;
    }

    case 'npm': {
      const message = `npm install ${deps} --save`;
      execSync(message, { stdio: 'inherit' });
      console.log(success);
      break;
    }
    case 'pnpm': {
      const message = `pnpm add ${deps} --save`;
      execSync(message, { stdio: 'inherit' });
      console.log(success);
      break;
    }

    case 'bun': {
      const message = `bun add ${deps}`;
      execSync(message, { stdio: 'inherit' });
      console.log(success);
      break;
    }

    default:
      const message = `npm install ${deps} --save`;
      console.error(message);
  }
} catch (error) {
  console.error(error);
}
