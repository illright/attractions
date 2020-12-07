const pkgVersions = require('pkg-versions');
const pkg = require('./package.json');

(async function () {
  const versions = await pkgVersions('attractions');
  if (versions.has(pkg.version)) {
    throw 'Version already published!';
  }
})();
