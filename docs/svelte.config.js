const path = require('path');
const autoPreprocess = require('svelte-preprocess');
const remarkHeadingID = require('remark-heading-id');
const { mdsvex } = require('mdsvex');
const makeAttractionsImporter = require('attractions/importer.js');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

module.exports = {
  extensions: ['.svelte', '.svx', '.md'],
  preprocess: [
    autoPreprocess({
      scss: {
        renderSync: true,
        importer: makeAttractionsImporter({
          themeFile: path.join(__dirname, 'static/css/attractions-theme.scss'),
        }),
        includePaths: [path.join(__dirname, 'static/css')],
      },
      sourceMap: dev,
    }),
    mdsvex({
      layout: {
        docs: path.join(__dirname, 'src/mdsvex/layout.svelte'),
        _: path.join(__dirname, 'src/mdsvex/layout-no-head.svelte'),
      },
      smartypants: {
        quotes: false,
        ellipses: true,
      },
      remarkPlugins: [remarkHeadingID],
      extensions: ['.svx', '.md'],
    }),
  ],
};
