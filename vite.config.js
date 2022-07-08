import { sveltekit } from '@sveltejs/kit/vite';
import pkg from './package.json' assert { type: 'json' };

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  server: {
    fs: {
      // https://github.com/vitejs/vite/issues/5689
      allow: ['.'],
    },
  },
  define: {
    'process.latest_version': JSON.stringify(pkg.version),
    'process.license': JSON.stringify(pkg.license),
  },
};

export default config;
