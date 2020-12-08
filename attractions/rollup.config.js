import path from 'path';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import autoPreprocess from 'svelte-preprocess';
import pkg from './package.json';

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
      svelte(),
      resolve(),
      terser({
        module: true,
      }),
    ],
  },
  {
    input: 'index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
      name: 'attractions',
    },
    plugins: [
      svelte({
        customElement: true,
        preprocess: [
          prependTagOption(icons),
          autoPreprocess({
            scss: { includePaths: ['./'] },
          }),
        ],
      }),
      resolve(),
      terser({
        module: true,
      }),
    ],
  },
];
