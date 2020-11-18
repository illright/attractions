# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/) and this project adheres to [Semantic Versioning](https://semver.org/).

## [2.2.1] - 2020-11-18

### Changed
- [`<DropdownShell>`](https://illright.github.io/attractions/docs/components/dropdown-shell): Now closes the dropdown when pressing <kbd>Enter</kbd> or <kbd>Escape</kbd> buttons.
- [`<TimePicker>`](https://illright.github.io/attractions/docs/components/time-picker): The currently selected value will now be highlighted in the dropdown. Labels are customizable as slots.

(Thanks to @RikuVan for these 2 contributions - #150)

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


[Unreleased]: https://github.com/illright/attractions/compare/v2.2.1...HEAD
[2.2.1]: https://github.com/illright/attractions/releases/tag/v2.2.1
[2.2.0]: https://github.com/illright/attractions/releases/tag/v2.2.0
[2.1.1]: https://github.com/illright/attractions/releases/tag/v2.1.1
[2.1.0]: https://github.com/illright/attractions/releases/tag/v2.1.0
