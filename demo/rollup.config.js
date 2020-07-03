import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import autoPreprocess from 'svelte-preprocess';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default [
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
