import remarkHeadingID from 'remark-heading-id';
import resolve from './resolve.js';

/** @type {Parameters<typeof import('mdsvex').mdsvex>[0]} */
const config = {
  extensions: ['.md', '.svx'],
  remarkPlugins: [remarkHeadingID],
  smartypants: {
    quotes: false,
    ellipses: true,
  },
  layout: {
    docs: resolve(import.meta.url, './src/lib/mdsvex/layout.svelte'),
    _: resolve(import.meta.url, './src/lib/mdsvex/layout-no-head.svelte'),
  },
};

export default config;
