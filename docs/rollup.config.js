import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';

import alias from '@rollup/plugin-alias';
import attractionsPkg from 'attractions/package.json';
const svelteConfig = require('./svelte.config.js');
import sapperEnv from 'sapper-environment';
import 'prismjs';
import 'prism-svelte';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);

const commonSubstitutions = {
  'process.env.NODE_ENV': JSON.stringify(mode),
  ...sapperEnv(),
  'process.latest_version': JSON.stringify(attractionsPkg.version),
  'process.license': JSON.stringify(attractionsPkg.license),
};

const pathAlias = alias({
  entries: [
    { find: /^src\//, replacement: __dirname + '/src/' },
    { find: /^#root\//, replacement: __dirname + '/../' },
  ],
});

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        'process.browser': true,
        ...commonSubstitutions,
      }),
      svelte({
        ...svelteConfig,
        compilerOptions: {
          dev,
          hydratable: true,
        },
        emitCss: true,
      }),
      pathAlias,
      resolve({
        browser: true,
        dedupe: ['svelte'],
      }),
      commonjs(),
      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          babelHelpers: 'runtime',
          exclude: ['node_modules/@babel/**'],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: '> 0.25%, not dead',
              },
            ],
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-transform-runtime',
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        'process.browser': false,
        ...commonSubstitutions,
      }),
      svelte({
        ...svelteConfig,
        compilerOptions: {
          dev,
          hydratable: true,
          generate: 'ssr',
        },
      }),
      pathAlias,
      resolve({
        dedupe: ['svelte'],
      }),
      commonjs(),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules
    ),

    preserveEntrySignatures: 'strict',
    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      commonjs(),
      !dev && terser(),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },
};
