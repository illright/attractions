import { parse } from 'acorn';
import { ancestor as walkAncestor } from 'acorn-walk';
import { generate } from 'astring';

import type { ImportDeclaration, Literal, Program } from 'estree';
import type { PreprocessorGroup } from 'svelte/types/compiler/preprocess';

export interface ImportExpanderRule {
  test: string | RegExp;
  router: (importedName: string) => string | undefined;
}

export interface ImportExpanderOptions {
  rules: ImportExpanderRule[];
}

function testPasses(
  importSource: Literal['value'],
  test: ImportExpanderRule['test']
) {
  if (typeof importSource !== 'string') {
    return false;
  }

  if (typeof test === 'string') {
    return importSource === test;
  }

  return test.test(importSource);
}

function expandImports(
  importDeclaration: ImportDeclaration,
  router: ImportExpanderRule['router']
) {
  const sinkDeclaration: ImportDeclaration = {
    type: 'ImportDeclaration',
    specifiers: [],
    source: importDeclaration.source,
  };

  const declarations: ImportDeclaration[] = [];
  for (const specifier of importDeclaration.specifiers) {
    // If the import is `import * as smth from 'smth'`, skip it
    if (specifier.type === 'ImportNamespaceSpecifier') {
      return [importDeclaration];
    }

    if (specifier.type === 'ImportDefaultSpecifier') {
      sinkDeclaration.specifiers.push(specifier);
      continue;
    }

    const newSource = router(specifier.imported.name);
    if (newSource === undefined) {
      sinkDeclaration.specifiers.push(specifier);
    } else {
      declarations.push({
        type: 'ImportDeclaration',
        specifiers: [
          {
            type: 'ImportDefaultSpecifier',
            local: specifier.local,
          },
        ],
        source: {
          type: 'Literal',
          value: newSource,
        },
      });
    }
  }

  if (sinkDeclaration.specifiers.length > 0) {
    declarations.push(sinkDeclaration);
  }

  return declarations;
}

/**
 * A quick'n'dirty hack for SvelteKit to optimize imports without modifying code.
 *
 * In detail:
 *   Large Svelte libraries (like Attractions itself) greatly slow down dev-mode
 *   performance of Sapper and SvelteKit because all exports of a library
 *   get processed even if an import only references a single object:
 *   ```ts
 *   import { BookOpenIcon } from 'svelte-feather-icons';
 *   ```
 *   The reasons for this are described here:
 *     https://github.com/sveltejs/kit/issues/2612
 *   The proposed workaround is to use deep imports instead of importing
 *   from an index file. This preprocessor does that under the hood.
 */
export default function importExpander({
  rules,
}: ImportExpanderOptions): PreprocessorGroup {
  return {
    async script({ content }) {
      const ast = parse(content, {
        ecmaVersion: 'latest',
        sourceType: 'module',
      });

      walkAncestor(ast, {
        ImportDeclaration(node, _state, ancestors) {
          const importDeclaration = node as unknown as ImportDeclaration;
          const program = ancestors[0] as unknown as Program;

          for (const rule of rules) {
            if (testPasses(importDeclaration.source.value, rule.test)) {
              const replacementRules = expandImports(
                importDeclaration,
                rule.router
              );
              program.body.splice(
                program.body.indexOf(importDeclaration),
                1,
                ...replacementRules
              );
            }
          }
        },
      });

      return {
        code: generate(ast),
      };
    },
  };
}
