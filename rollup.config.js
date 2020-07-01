import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import autoPreprocess from 'svelte-preprocess';
import { terser } from 'rollup-plugin-terser';
import pkg from './attractions/package.json';

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'attractions/index.js',
    output: [
      { file: `attractions/${pkg.module}`, 'format': 'es' },
      { file: `attractions/${pkg.main}`, 'format': 'umd', name },
    ],
    plugins: [
      svelte(),
      resolve(),
    ],
  },
  {
    input: 'demo/main.js',
    output: {
      format: 'iife',
      name: 'attractions',
      file: 'demo/public/build/bundle.js',
    },
    plugins: [
      svelte({
        dev: !production,
        hydratable: true,
        preprocess: [
          autoPreprocess({
            scss: {
              includePaths: [
                './demo/static/',
              ],
            },
          }),
        ],
        css: css => css.write('demo/public/build/bundle.css', false),
      }),
      resolve({
        browser: true,
        dedupe: ['svelte'],
      }),
      !production && serve(),
      production && terser({
        module: true,
      }),
    ],
  },
];

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (started) {
        return;
      }
      started = true;

      require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      });
    },
  };
}
