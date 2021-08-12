<img src="https://raw.githubusercontent.com/illright/attractions/master/docs/static/android-chrome-192x192.png" alt="Logo" align="right" width="80" />

# Attractions

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/illright/attractions/Release)](https://github.com/illright/attractions/actions?query=workflow%3ARelease)
[![npm](https://img.shields.io/npm/v/attractions)](https://www.npmjs.com/package/attractions)
[![npm bundle size](https://img.shields.io/bundlephobia/min/attractions)](https://bundlephobia.com/result?p=attractions)
[![npm bundle zipped size](https://img.shields.io/bundlephobia/minzip/attractions)](https://bundlephobia.com/result?p=attractions)

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/illright/attractions)

A pretty cool UI kit for Svelte.

Refer to the main documentation: <https://illright.github.io/attractions>

## Installation

**Step 1.** Install the library with your favorite package manager:

```bash
npm install --save-dev attractions
# -- or --
yarn add --dev attractions
# -- or --
pnpm add --save-dev attractions
```

**Step 2.** Install `svelte-preprocess`, Dart Sass and PostCSS:

```bash
npm install --save-dev svelte-preprocess sass postcss
# -- or --
yarn add --dev svelte-preprocess sass postcss
# -- or --
pnpm add --save-dev svelte-preprocess sass postcss
```

**Step 3.** Add `svelte-preprocess` to your preprocessor chain ([as shown here](https://github.com/sveltejs/svelte-preprocess/blob/main/docs/usage.md)):

```js
// rollup.config.js
import sveltePreprocess from 'svelte-preprocess';

export default {
  // ...,
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
  ],
};
```

**Step 4.** Import the desired components as named imports and use wherever you like!

```svelte
<script>
  import { Button } from 'attractions';
</script>

<Button>click me</Button>
```

For more information on how to customize/theme your installation, see [the docs](https://illright.github.io/attractions/docs/theming).

---

Alternatively, the library can be used from a CDN, such as [unpkg](https://unpkg.com/attractions), and then the components will be registered as custom elements. This is especially useful for quick prototypes that do not need all the features provided.

Example usage:

```html
<head>
  <script src="https://unpkg.com/attractions"></script>
</head>
<body>
  <a-button filled="filled">My button</a-button>
</body>
```

For more details, check out [the docs](https://illright.github.io/attractions/docs/custom-elements).

## License

This project is [MIT licensed](./LICENSE).
