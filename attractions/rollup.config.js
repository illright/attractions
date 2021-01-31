import path from 'path';
import { spawnSync } from 'child_process';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import sveld from 'sveld';
import pkg from './package.json';
const svelteConfig = require('./svelte.config.js');

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());

function prependTagOption(exceptions = []) {
  return {
    markup({ content, filename }) {
      const name = path.basename(filename, '.svelte');
      const tagName = exceptions.includes(name) ? '{null}' : `a-${name}`;
      const optionsTag = `<svelte:options tag="${tagName}" />`;
      return { code: optionsTag + '\n\n' + content };
    },
  };
}

const icons = [
  'more-horizontal',
  'chevron-left',
  'chevron-right',
  'x',
  'paperclip',
  'plus',
  'trash-2',
  'star',
  'clock',
];

export default [
  {
    input: 'index.js',
    output: [
      { file: pkg.module, format: 'es' },
      { file: pkg.main, format: 'umd', name },
    ],
    plugins: [
      svelte({
        ...svelteConfig,
        emitCss: false,
      }),
      resolve(),
      terser({
        module: true,
      }),
    ],
  },
  {
    input: 'index.js',
    output: {
      file: 'dist/custom-elements.js',
      format: 'iife',
      name: 'attractions',
    },
    plugins: [
      svelte({
        ...svelteConfig,
        compilerOptions: {
          customElement: true,
        },
        preprocess: [prependTagOption(icons), ...svelteConfig.preprocess],
      }),
      resolve(),
      sveld({
        typesOptions: {
          preamble: 'export * as utils from "./utils";\n',
          outDir: '.',
        },
      }),
      {
        name: 'utilsTypings',
        writeBundle() {
          spawnSync('tsc', { shell: true });
        },
      },
      terser({
        module: true,
      }),
    ],
  },
];
