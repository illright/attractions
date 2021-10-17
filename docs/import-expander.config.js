/** @type import('@attractions/import-expander').ImportExpanderOptions */
const config = {
  rules: [
    {
      test: 'svelte-feather-icons',
      router: name => `svelte-feather-icons/src/icons/${name}.svelte`,
    },
  ],
};

export default config;
