<img src="https://raw.githubusercontent.com/illright/attractions/master/attractions-logo.png" alt="Logo" align="right" width="80" />

# Attractions

A UI kit for Svelte.


## Installation

**Step 1.** Install the library with npm or Yarn:

```bash
npm install --save-dev attractions
# -- or --
yarn add -D attractions
```

**Step 2.** Make sure you have configured [`svelte-preprocess`](https://github.com/sveltejs/svelte-preprocess#usage) for compiling SCSS.

**Step 3.** Create a file named `_attractions-theme.scss` (can be empty) anywhere in the project and add the path to the directory containing file to `includePaths` for SCSS:

```js
autoPreprocess({
  scss: {
    includePaths: [
      './path/to/theme',
    ],
  },
})
```

## Theming

You may configure style parameters such as colors, fonts and shadows by overriding respective variables in your `_attractions-theme.scss` file:

```scss
$main: #b17200;
$font: 'Noto Sans', sans-serif;
```

Refer to the documentation for each component for the variables available for overriding.

## License

This project is [MIT licensed](./LICENSE).
