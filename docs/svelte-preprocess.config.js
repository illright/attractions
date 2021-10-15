import makeAttractionsImporter from 'attractions/importer.js';
import { resolve } from 'path';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('svelte-preprocess/dist/types').AutoPreprocessOptions} */
const config = {
  scss: {
    renderSync: true,
    importer: makeAttractionsImporter({
      themeFile: resolve('./src/lib/attractions-theme.scss'),
      nodeModulesPath: resolve('./node_modules'),
    }),
    includePaths: [resolve('./src/lib')],
  },
  sourceMap: dev,
};

export default config;
