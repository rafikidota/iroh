import { execSync } from 'child_process';
import { existsSync } from 'fs';

try {
  const packageManagers: { [key: string]: string } = {
    'yarn.lock': 'yarn',
    'package-lock.json': 'npm',
    'pnpm-lock.yaml': 'pnpm',
    'bun.lockb': 'bun',
  };

  let packageManager: string | null = null;

  for (const [file, manager] of Object.entries(packageManagers)) {
    if (existsSync(file)) {
      packageManager = manager;
      break;
    }
  }

  switch (packageManager) {
    case 'yarn':
      execSync(
        'yarn add @nestjs/swagger @nestjs/typeorm typeorm @nestjs/config jsonwebtoken uuid joi',
        { stdio: 'inherit' },
      );
      break;
    case 'npm':
      execSync(
        'npm install @nestjs/swagger @nestjs/typeorm typeorm @nestjs/config jsonwebtoken uuid joi',
        { stdio: 'inherit' },
      );
      break;
    case 'pnpm':
      execSync(
        'pnpm add @nestjs/swagger @nestjs/typeorm typeorm @nestjs/config jsonwebtoken uuid joi',
        { stdio: 'inherit' },
      );
      break;
    case 'bun':
      execSync(
        'bun add @nestjs/swagger @nestjs/typeorm typeorm @nestjs/config jsonwebtoken uuid joi',
        { stdio: 'inherit' },
      );
      break;
    default:
      console.error(
        'No se detectó un gestor de paquetes válido (yarn, npm, pnpm o bun).',
      );
  }
} catch (error) {
  console.error(error);
}
