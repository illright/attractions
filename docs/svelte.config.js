import { mdsvex } from 'mdsvex';
import autoPreprocess from 'svelte-preprocess';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const attractionsPkg = require('attractions/package.json');

import resolve from './resolve.js';
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
    vite: {
      define: environment,
      resolve: {
        alias: {
          $root: resolve(import.meta.url, '..'),
        },
      },
    },
  },
  preprocess: [autoPreprocess(sveltePreprocessConfig), mdsvex(mdsvexConfig)],
};

export default config;
