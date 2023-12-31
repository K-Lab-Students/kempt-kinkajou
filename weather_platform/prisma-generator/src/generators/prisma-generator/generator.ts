import {
  addProjectConfiguration,
  formatFiles,
  generateFiles, joinPathFragments,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { PrismaGeneratorGeneratorSchema } from './schema';

interface GeneratorOptions {
  name: string;
  provider: string;
  connectionString: string;
}

export async function prismaGeneratorGenerator(
  tree: Tree,
  schema: GeneratorOptions
) {

  const { name, className, constantName } = names(schema.name);


  generateFiles(
    tree,
    joinPathFragments(__dirname, './template'),
    'libs/prisma-clients',
    {
      dbType: schema.provider,
      tmpl: '',
      name,
      className,
      constantName,
      outputLocation: `../../../../node_modules/.prisma/${name}-client`
    }
  );

  if ( !tree.exists('.env') ) {
    tree.write('.env', '')
  }

  let contents = tree.read('.env').toString();
  contents += `${constantName}_SOURCE_URL=${schema.connectionString}\n`;
  tree.write('.env', contents);

  if ( !tree.exists('libs/prisma-clients/index.ts') ) {
    tree.write('libs/prisma-clients/index.ts', '')
  }

  let exportsConents = tree.read('libs/prisma-clients/index.ts').toString()
  exportsConents += `export { ${className}Client } from './${name}';\n`
  tree.write('libs/prisma-clients/index.ts', exportsConents)

  await formatFiles(tree);
}

export default prismaGeneratorGenerator;
