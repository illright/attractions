/**
 * Creates a custom Sass importer for painless configurations.
 * @param {{ themeFile?: string; nodeModulesPath?: string }} [options]
 * @returns {(url: string, prev?: string) => ({ file: string } | null)}
 */
module.exports = function makeAttractionsImporter(options = {}) {
  const { themeFile, nodeModulesPath = 'node_modules' } = options;

  return function attractionsImporter(url, _prev) {
    if (url === 'node_modules/attractions/_variables') {
      if (themeFile != null) {
        return { file: themeFile };
      }
      return { file: `${nodeModulesPath}/attractions/_variables` };
    }

    const modulePrefix = '~attractions/';
    if (url.startsWith(modulePrefix)) {
      return {
        file: `${nodeModulesPath}/attractions/${url.slice(
          modulePrefix.length
        )}`,
      };
    }

    return null;
  };
};
