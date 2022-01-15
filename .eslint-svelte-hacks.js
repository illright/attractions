/**
 * `eslint-plugin-svelte3` doesn't do well with CSS preprocessors.
 *
 * Source:
 *   https://github.com/sveltejs/eslint-plugin-svelte3#svelte3ignore-styles
 */
module.exports = {
  settings: {
    'svelte3/ignore-styles': attrs => attrs.lang === 'scss',
  },
};
