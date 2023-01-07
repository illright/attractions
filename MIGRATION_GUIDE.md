# Migration Guide

Here you may find guidance on upgrading Attractions from one major version to another.

## From v3.x to v4.x

**Sass**: all variables were renamed to CSS custom properties equivalents with `--a` prefix (standing for **A**ttractions).
The following also changed:

- `$main` --> `--a-primary`
- `$main-text` --> `--a-on-primary`
-

The following variables need to be specified in HSL:

- `--a-primary`: `--a-primary-h`, `--a-primary-s`, `--a-primary-l`. Do NOT specify `--a-primary` directly.

styles in general have changed.

## From v2.x to v3.x

The main change in version 3 is the migration to Sass modules.

If you have existing code that used Sass for styling and was using the old `@import` statements, consider using the automatic [Sass Migrator](https://sass-lang.com/documentation/cli/migrator) tool first.

**Heads up**: if your styles used imports that relied on `includePaths`, you can still make Sass Migrator understand them by setting the `SASS_PATH` environment variable to the path that you previously had in your `includePaths` Sass compiler option.

Once your code is ready for Sass modules, replace Node Sass (`node-sass`) with Dart Sass (`sass`).

Update your `rollup.config.js` to use the new Attractions importers:

```js
import autoPreprocess from 'svelte-preprocess';
import makeAttractionsImporter from 'attractions/importer.js';

const preprocessChain = [
  autoPreprocess({
    scss: {
      importer: makeAttractionsImporter({
        // If you previously had a file that was overriding Attractions variables,
        //   provide the path to it here.
        // If it was empty, you may delete it, omit this parameter
        //   and call the function with no arguments.
        themeFile: './static/css/_attractions-theme.scss',
      }),

      includePaths: ['./static/css'],
    },
  }),
];
```

Lastly, if your `_attractions-theme.scss` had any variable overrides, move them to the module configuration.

Before:

```scss
@import '_attractions-theme.scss';
$font: 'Open Sans', sans-serif;
$main: green;
$my-custom-variable: 1px;
```

After:

```scss
@forward "~attractions/_variables" with (
  $font: ('Open Sans', sans-serif),
  $main: green;
);
$my-custom-variable: 1px;
```
