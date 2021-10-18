import { resolve } from 'path';
import { mdsvex } from 'mdsvex';
import staticAdapter from '@sveltejs/adapter-static';
import autoPreprocess from 'svelte-preprocess';
import importExpander from '@attractions/import-expander';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const attractionsPkg = require('attractions/package.json');

import importExpanderConfig from './import-expander.config.js';
import mdsvexConfig from './mdsvex.config.js';
import sveltePreprocessConfig from './svelte-preprocess.config.js';

const environment = {
  'vite.define.latestVersion': JSON.stringify(attractionsPkg.version),
  'vite.define.license': JSON.stringify(attractionsPkg.license),
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  kit: {
    target: 'body',
    adapter: staticAdapter(),
    paths: {
      base: process.env.APP_BASEPATH ?? '',
    },
    vite: {
      define: environment,
      resolve: {
        alias: {
          $root: resolve('..'),
        },
      },
    },
  },
  preprocess: [
    importExpander(importExpanderConfig),
    autoPreprocess(sveltePreprocessConfig),
    mdsvex(mdsvexConfig),
  ],
};

export default config;
