import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
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
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  splitting: false,
});
