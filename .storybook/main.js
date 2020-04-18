module.exports = {
  stories: ['../stories/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
    '@storybook/addon-docs',
  ],

  async webpack(config) {
    /* Configure `svelte-preprocess` for svelte-loader. */
    config.resolve.mainFields = ['svelte', 'browser', 'module', 'main'];
    const svelteLoaderUse = {
      loader: 'svelte-loader',
      options: {
        emitCss: true,
        preprocess: require('svelte-preprocess')({
          scss: { includePaths: ['.storybook'], },
        }),
      },
    };

    let ruleExists = false;
    for (let rule of config.module.rules) {
      if (/svelte-loader/.test(rule.loader)) {
        delete rule.loader;
        delete rule.options;
        rule.exclude = /node_modules/;
        rule.use = svelteLoaderUse;
        ruleExists = true;
        break;
      }
    }

    if (!ruleExists) {
      config.module.rules.push({
        exclude: /node_modules/,
        test: /\.(svelte|html)$/,
        use: svelteLoaderUse,
      });
    }
    return config;
  },
};
