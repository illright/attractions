import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import remarkHeadingID from 'remark-heading-id';

const scssAliases = aliases => {
  return url => {
    for (const [alias, aliasPath] of Object.entries(aliases)) {
      if (url.startsWith(alias)) {
        return {
          file: url.replace(alias, aliasPath),
        };
      }
    }
    return url;
  };
};

const dev = process.env.NODE_ENV !== 'production';
const BASE_PATH = process.env.VITE_BASE_PATH ?? null;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx', '.md'],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      scss: {
        renderSync: true,
        // For some reason, these aliases work only inside SCSS content
        //  but not with `<style src="$css/...">`, without printing errors
        importer: scssAliases({
          $css: './src/css',
        }),
      },
    }),
    mdsvex({
      layout: {
        docs: './src/mdsvex/layout.svelte',
        _: './src/mdsvex/layout-no-head.svelte',
      },
      smartypants: {
        quotes: false,
        ellipses: true,
      },
      remarkPlugins: [remarkHeadingID],
      extensions: ['.svx', '.md'],
    }),
  ],
  kit: {
    adapter: adapter(),
    paths: {
      base: BASE_PATH ?? (dev ? '' : '/attractions'),
    },
    alias: {
      $mdsvex: './src/mdsvex',
      $components: './src/components',
      $containers: './src/containers',
      '#root': './',
    },
  },
  vitePlugin: {
    prebundleSvelteLibraries: true,
  },
};

export default config;
