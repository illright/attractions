import remarkHeadingID from 'remark-heading-id';

/** @type {Parameters<typeof import('mdsvex').mdsvex>[0]} */
const config = {
  extensions: ['.md', '.svx'],
  remarkPlugins: [remarkHeadingID],
  smartypants: {
    quotes: false,
    ellipses: true,
  },
  layout: {
    docs: 'src/mdsvex/layout.svelte',
    _: 'src/mdsvex/layout-no-head.svelte',
  },
};

export default config;
