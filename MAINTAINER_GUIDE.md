# Maintainer's Guide

Notes to self and quirks of the project's implementation in case all of the current maintainers get hit by the same bus.

## Why we use Sass

- A lot of the colors are computed with Sass color functions, switching to CSS variables would mean a whole lot more variables.
- Using Sass variables instead of CSS variables gives us more browser compatibility.

## Why we use Sass so strangely

Specifically talking about how most of the components have the following line:

```scss
@use 'node_modules/attractions/_variables';
```

That path doesn't exist for us, library developers, but it does exist for the users who installed this library and are now compiling SCSS. This is done to enable zero-config installation for those users who are not interested in changing Sass variables or using them in their own stylesheets.

So how does it work? Glad you asked.  
Sass has several stages of resolution when it comes to imports:

> 1. Loading a file relative to the file in which the `@use` or `@import` appeared.
>
> 2. Each custom importer.
>
> 3. Loading a file relative to the current working directory.
>
> 4. Each load path in `includePaths`
>
> 5. Each load path specified in the `SASS_PATH` environment variable, which should be semicolon-separated on Windows and colon-separated elsewhere.

The trick is to utilize the steps after the second so that the users who want to configure their installation could intercept the resolution chain at step 2.  
Particularly, this import uses step 3 (reminding you that the current working directory is the one your terminal is at when running the compilation command, which is probably the same one that holds `rollup.config.js`). Thus, if there are no importers, step 1 fails, step 2 fails, and step 3 resolves.  
We too can intercept the chain at step 2 when building the library, so it's okay that the path doesn't exist – our building code will not fail.

Sass mixins, on the other hand, never need to be overridden, so it's okay to import them with step 1 (`@use '../_mixins';`).
