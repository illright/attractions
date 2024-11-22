<img src="https://raw.githubusercontent.com/illright/attractions/master/docs/static/android-chrome-192x192.png" alt="Logo" align="right" width="80" />

# Attractions

> [!IMPORTANT]
> This UI kit is now deprecated. It's originally been built for Svelte 3, since then a lot has changed in the ecosystem. Namely, Svelte 5 came out with much better ergonomics for component libraries and a lot of other great projects popped up, like [shadcn-svelte](https://www.shadcn-svelte.com/) and [Melt UI](https://www.melt-ui.com/). Today you should use those projects instead.

<details>

<summary>Old README </summary>

[![Inactively Maintained](https://img.shields.io/badge/Maintenance%20Level-Inactively%20Maintained-yellowgreen.svg)](https://gist.github.com/cheerfulstoic/d107229326a01ff0f333a1d3476e068d)

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/illright/attractions/auto-release.yml)](https://github.com/illright/attractions/actions?query=workflow%3ARelease)
[![npm](https://img.shields.io/npm/v/attractions)](https://www.npmjs.com/package/attractions)
[![npm bundle size](https://img.shields.io/bundlephobia/min/attractions)](https://bundlephobia.com/result?p=attractions)
[![npm bundle zipped size](https://img.shields.io/bundlephobia/minzip/attractions)](https://bundlephobia.com/result?p=attractions)

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/illright/attractions)

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

</details>

## License

This project is [MIT licensed](./LICENSE).
