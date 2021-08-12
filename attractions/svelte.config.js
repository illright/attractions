const path = require('path');
const autoPreprocess = require('svelte-preprocess');

const makeAttractionsImporter = require('./importer.js');

module.exports = {
  preprocess: [
    autoPreprocess({
      scss: {
        importer: makeAttractionsImporter({
          themeFile: path.join(__dirname, '_variables.scss'),
        }),
        renderSync: true,
      },
    }),
  ],
};
