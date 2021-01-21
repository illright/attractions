const path = require('path');
const autoPreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: [
    autoPreprocess({
      scss: {
        importer(url, _prev) {
          if (url === 'node_modules/attractions/_variables') {
            return { file: path.join(__dirname, '_variables.scss') };
          }
        },
        renderSync: true,
      },
    }),
  ],
};
