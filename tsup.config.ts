import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
  entry: [
    'src/index.ts',
    'src/schematics/crud/crud.factory.ts',
    'src/schematics/crud/schema.d.ts',
    'src/schematics/crud/schema.json',
    'src/schematics/utils/index.ts',
    'src/schematics/utils/metadata.manager.ts',
    'src/schematics/utils/module-import.declarator.ts',
    'src/schematics/utils/module-metadata.declarator.ts',
    'src/schematics/utils/module.declarator.ts',
    'src/schematics/utils/module.finder.ts',
    'src/schematics/utils/name.parser.ts',
    'src/schematics/utils/path.solver.ts',
    'src/schematics/utils/source-root.helpers.ts',
    'src/schematics/utils/string-utils.ts',
    // Excluyendo archivos de plantillas
    '!src/schematics/crud/files/ts/__name__.controller.ts',
    '!src/schematics/crud/files/ts/__name__.module.ts',
    '!src/schematics/crud/files/ts/__name__.service.ts',
    '!src/schematics/crud/files/ts/entities/__name__.entity.ts',
    '!src/schematics/crud/files/ts/dto/__name__.create.dto.ts',
    '!src/schematics/crud/files/ts/dto/__name__.update.dto.ts',
    // Excluyendo archivo de licencia
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
