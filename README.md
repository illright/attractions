<img src="https://raw.githubusercontent.com/illright/attractions/master/docs/static/logo-192.png" alt="Logo" align="right" width="80" />

# Attractions

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/illright/attractions/Release)](https://github.com/illright/attractions/actions?query=workflow%3ARelease)
[![npm](https://img.shields.io/npm/v/attractions)](https://www.npmjs.com/package/attractions)
[![npm bundle size](https://img.shields.io/bundlephobia/min/attractions)](https://bundlephobia.com/result?p=attractions)
[![npm bundle zipped size](https://img.shields.io/bundlephobia/minzip/attractions)](https://bundlephobia.com/result?p=attractions)

A pretty cool UI kit for Svelte.

Refer to the main documentation: <https://illright.github.io/attractions>


## Installation

**Step 1.** Install the library with npm or Yarn:

```bash
npm install --save-dev attractions
# -- or --
yarn add -D attractions
```

**Step 2.** Add [`svelte-preprocess`](https://github.com/sveltejs/svelte-preprocess/blob/master/docs/usage.md) to your preprocessor chain for compiling SCSS.

**Step 3.** Create a file named `_attractions-theme.scss` (can be empty) anywhere in the project and add the path to the directory containing file to `includePaths` for SCSS:

```js
import autoPreprocess from 'svelte-preprocess';

autoPreprocess({
  scss: {
    includePaths: [
      './path/to/theme',
    ],
  },
})
```

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

## Theming

You may configure style parameters such as colors, fonts and shadows by overriding respective variables in your `_attractions-theme.scss` file:

```scss
$main: #b17200;
$font: 'Noto Sans', sans-serif;
```

Refer to the documentation for each component for the variables available for overriding.

## License

This project is [MIT licensed](./LICENSE).
