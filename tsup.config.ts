import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['esm'],
  entry: [
    'src/index.ts',
    'src/schematics/crud/*.ts',
    'src/schematics/crud/schema.json',
    'src/schematics/utils/*.ts',
    '!src/schematics/crud/files/ts/**/*.ts',
    '!src/schematics/utils/LICENSE',
    '!src/**/*.json',
  ],
  dts: true,
  splitting: false,
  skipNodeModulesBundle: true,
  clean: true,
  outDir: 'dist',
  target: 'es2022',
});
