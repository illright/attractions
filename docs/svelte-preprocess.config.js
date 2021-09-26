import makeAttractionsImporter from 'attractions/importer.js';
import resolve from './resolve.js';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('svelte-preprocess/dist/types').AutoPreprocessOptions} */
const config = {
  scss: {
    renderSync: true,
    importer: makeAttractionsImporter({
      themeFile: resolve(
        import.meta.url,
        './static/css/attractions-theme.scss'
      ),
      nodeModulesPath: resolve(import.meta.url, './node_modules'),
    }),
    includePaths: [resolve(import.meta.url, './static/css')],
  },
  sourceMap: dev,
};

export default config;
