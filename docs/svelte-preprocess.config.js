import { URL } from 'url';
import makeAttractionsImporter from 'attractions/importer.js';

/**
 * `path.resolve(__dirname, ...)` functionality for ES Modules.
 *
 * @param {string} path The path to resolve relative to the current file.
 * @returns The absolute path corresponding to the given relative path.
 */
function resolve(path) {
  return decodeURIComponent(new URL(path, import.meta.url).pathname);
}

const dev = process.env.NODE_ENV === 'development';

/** @type {import('svelte-preprocess/dist/types').AutoPreprocessOptions} */
const config = {
  scss: {
    renderSync: true,
    importer: makeAttractionsImporter({
      themeFile: resolve('./static/css/attractions-theme.scss'),
      nodeModulesPath: resolve('./node_modules'),
    }),
    includePaths: [resolve('./static/css')],
  },
  sourceMap: dev,
};

export default config;
