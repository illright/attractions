# Changelog

All notable changes to this project will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/) and this project adheres to [Semantic Versioning](https://semver.org/).

## [3.1.0] - 2021-01-22

### Added

- **TypeScript support**: We now provide our own type declaration (`.d.ts`) files so that TypeScript users will have a more delightful development experience! Note that other users are not affected since the components are written in plain JS ([#211](https://github.com/illright/attractions/pull/211)).
- Allow passing a `closeCallback` for snackbars ([#216](https://github.com/illright/attractions/pull/216)).

### Fixed

- Documentation: [`RadioButton`](https://illright.github.io/attractions/docs/components/radio-button)'s `value` was incorrectly marked as optional.

### Changed

- The recommended installation procedure now involves separating the Svelte configuration into a separate file, `svelte.config.js`. This allows the Svelte Language Server to reliably analyze your source code, so your editor becomes smarter.

---

### Known issues

- The types are not entirely null-aware. If you use `--strictNullChecks`, you might face some errors like "`null` cannot be assigned to type `string`".
- Functions exported from components are falsely detected as props, and not even typed properly yet

## [3.0.0] - 2021-01-10

Not a large release, but still breaking. This will upgrade Attractions to use Sass modules which will allow zero-config installations.

Refer to the [migration guide](./docs/migration-guide) for information on how to upgrade.

### Added

- New Sass variables for the X icon in the search fields and the regular font weight.
- A slight animation for the checkbox component.
- Autocompletes can now be disabled like regular text fields.

### Changed

- Sass modules are now used for styling. This is a **breaking** change.

## [2.3.1] - 2020-12-23

### Fixed

- The autocomplete wasn't filtering out selected options without typing ([#195](https://github.com/illright/attractions/issues/195), thanks to [@sallaben](https://github.com/sallaben) for reporting and fixing).
- The slot forwarding of Autocomplete was breaking slot defaults.

## [2.3.0] - 2020-12-22

### Added

- Autocomplete now supports the same slots as AutocompleteField.
- A new utility `escapeRegExp` is now available in utils.

### Changed

- Dart Sass (`sass`) is now used instead of Node Sass (`node-sass`). Consider replacing (simply removing one and installing the other).
- The pure-JS bundle with custom elements is renamed (`dist/bundle.js` → `dist/custom-elements.js`) and available directly through Unpkg.
- Svelte 3.29.1 and higher is now required to support slot forwarding.

### Fixed

- The pure-JS bundles now contain styles (so that they are at least not useless).
- The Autocomplete component now doesn't throw an error when regex characters are written into it ([#184](https://github.com/illright/attractions/issues/184)).
- The Autocomplete options weren't showing after selecting something when minimal search length was set to 0 ([#183](https://github.com/illright/attractions/issues/183)).
- The FileTile component is now correctly clipping long filenames ([#125](https://github.com/illright/attractions/issues/125)).
- The DatePicker was unexpectedly closing when a certain month change would happen.

## [2.2.4] - 2020-12-08

### Fixed

- DatePicker and TimePicker threw exceptions when you cleared them ([#170](https://github.com/illright/attractions/issues/170)).
- The Autocomplete wasn't showing the dropdown ([#172](https://github.com/illright/attractions/issues/172)).
- Pagination component styles weren't applied properly.

## [2.2.3] - 2020-11-21

### Fixed

- Warnings about forgetting to set `customElement: true` should no longer bother you.

## [2.2.2] - 2020-11-19

### Fixed

- The dropdown was causing an error when using SSR.

## [2.2.1] - 2020-11-18

### Changed

- [`<DropdownShell>`](https://illright.github.io/attractions/docs/components/dropdown-shell): Now closes the dropdown when pressing <kbd>Enter</kbd> or <kbd>Escape</kbd> buttons.
- [`<TimePicker>`](https://illright.github.io/attractions/docs/components/time-picker): The currently selected value will now be highlighted in the dropdown. Labels are customizable as slots.

(Thanks to [@RikuVan](https://github.com/RikuVan) for these 2 contributions – [#150](https://github.com/illright/attractions/pull/150))

## [2.2.0] - 2020-11-10

### Added

- All components are now registered as `customElements` as well, meaning that they can be used without Svelte (or any framework). This does not affect any existing usage. More information in [the docs](https://illright.github.io/attractions/docs/custom-elements).

### Changed

- The [`<Button>`](https://github.com/illright/attractions/blob/master/attractions/button/button.svelte)'s `click` event was being forwarded directly instead of the payload being wrapped as with other events. This is changed for consistency.
- Updated PostCSS peer dependency to support newer versions.

## [2.1.1] - 2020-09-02

Minor documentation and bug fixes.

### Added

- [`<Tab>`](https://github.com/illright/attractions/blob/master/attractions/tab/tab.svelte)s
  now also dispatch `click` event.

### Fixed

- Mobile navigation in documentation ("Components" tab dropdown now works as expected).
- Styles now load properly when navigating directly to a page in the docs (without passing through the main page first).
- The `DatePicker` now loses focus properly.

## [2.1.0] - 2020-08-21

First stable release with proper documentation.
Previous, undocumented, releases can be found in [the releases section](https://github.com/illright/attractions/releases).

[unreleased]: https://github.com/illright/attractions/compare/v3.1.0...HEAD
[3.1.0]: https://github.com/illright/attractions/releases/tag/v3.1.0
[3.0.0]: https://github.com/illright/attractions/releases/tag/v3.0.0
[2.3.1]: https://github.com/illright/attractions/releases/tag/v2.3.1
[2.3.0]: https://github.com/illright/attractions/releases/tag/v2.3.0
[2.2.4]: https://github.com/illright/attractions/releases/tag/v2.2.4
[2.2.3]: https://github.com/illright/attractions/releases/tag/v2.2.3
[2.2.2]: https://github.com/illright/attractions/releases/tag/v2.2.2
[2.2.1]: https://github.com/illright/attractions/releases/tag/v2.2.1
[2.2.0]: https://github.com/illright/attractions/releases/tag/v2.2.0
[2.1.1]: https://github.com/illright/attractions/releases/tag/v2.1.1
[2.1.0]: https://github.com/illright/attractions/releases/tag/v2.1.0
