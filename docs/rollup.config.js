import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import autoPreprocess from 'svelte-preprocess';
import pkg from './package.json';
import attractionsPkg from 'attractions/package.json';
import sapperEnv from 'sapper-environment';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) => (
  warning.code === 'CIRCULAR_DEPENDENCY'
  && /[/\\]@sapper[/\\]/.test(warning.message)
) || onwarn(warning);

const commonSubstitutions = {
  ...sapperEnv(),
  'process.latest_version': JSON.stringify(attractionsPkg.version),
  'process.license': JSON.stringify(attractionsPkg.license),
};

const preprocess = [
  autoPreprocess({
    scss: { includePaths: ['./static/css'] },
  }),
];

const pathAlias = alias({
  resolve: ['.js', '.svelte', '.svg'],
  entries: [
    { find: /^src\//, replacement: __dirname + '/src/' },
  ],
});

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
        ...commonSubstitutions,
      }),
      svelte({
        preprocess,
        dev,
        hydratable: true,
        emitCss: true,
      }),
      resolve({
        browser: true,
        dedupe: ['svelte'],
      }),
      commonjs(),
      pathAlias,

      legacy && babel({
        extensions: ['.js', '.mjs', '.html', '.svelte'],
        babelHelpers: 'runtime',
        exclude: ['node_modules/@babel/**'],
        presets: [
          ['@babel/preset-env', {
            targets: '> 0.25%, not dead',
          }],
        ],
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          ['@babel/plugin-transform-runtime', {
            useESModules: true,
          }],
        ],
      }),

      !dev && terser({
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
        'process.env.NODE_ENV': JSON.stringify(mode),
        ...commonSubstitutions,
      }),
      svelte({
        preprocess,
        generate: 'ssr',
        dev,
      }),
      resolve({
        dedupe: ['svelte'],
      }),
      commonjs(),
      pathAlias,
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules || Object.keys(process.binding('natives')),
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
