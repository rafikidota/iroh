import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';

const loadPackageJson = () => {
  const path = join(process.cwd(), 'package.json');
  const data = readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

const { version } = loadPackageJson();

export const SwaggerDocument = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('Nestjs Endpoints')
  .setVersion(version)
  .addServer(`http://${process.env.API_HOST}:${process.env.API_PORT}`)
  .addBearerAuth()
  .addBasicAuth()
  .build();

export const SwaggerOptions: SwaggerCustomOptions = {
  swaggerOptions: { persistAuthorization: true },
};
