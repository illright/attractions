import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import autoPreprocess from 'svelte-preprocess';
import pkg from './package.json';

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());

export default [
  {
    input: 'index.js',
    output: [
      { file: pkg.module, 'format': 'es' },
      { file: pkg.main, 'format': 'umd', name },
    ],
    plugins: [
      svelte(),
      resolve(),
    ],
  },
  {
    // This will likely replace the other configuration above
    input: 'index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
      name: 'attractions',
    },
    plugins: [
      svelte({
        customElement: true,
        preprocess: autoPreprocess({
          scss: { includePaths: ['./'] },
        }),
      }),
      resolve(),
    ],
  },
];
