<img src="https://raw.githubusercontent.com/illright/attractions/master/attractions-logo.png" alt="Logo" align="right" width="80" />

# Attractions

A UI kit for Svelte.


## Prerequisites

This library uses SCSS for styling, therefore, `svelte-preprocess` should be configured for your application if you're using Rollup.

## Installation

**Step 1.** Clone this library and run the following command inside the cloned folder:

```bash
npm link
```

**Step 2.** Link this library to your application by running the following inside your application's folder:

```bash
npm link attractions
```

**Step 3.** Make sure you have `svelte-preprocess` installed and [configured](https://github.com/kaisermann/svelte-preprocess#usage).

**Step 4.** Create a file named `_attractions-theme.scss` (can be empty) anywhere in the project and add the path to that file to `includePaths` for Sass:

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

This project is under the terms of the MIT license.
