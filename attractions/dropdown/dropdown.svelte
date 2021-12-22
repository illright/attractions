<script>
  import { getContext } from 'svelte';
  import classes from '../utils/classes.js';
  import {
    HorizontalAlignment,
    VerticalAlignment,
  } from './dropdown-alignment.js';
  import {
    getDropdownShellBoundaryKey,
    isDropdownOpenKey,
  } from './dropdown-context-key';

  let _class = null;
  export { _class as class };
  /**
   * Aligns the dropdown content with the right edge of the shell.
   * @deprecated
   * @type {boolean}
   */
  export let right = false;
  /**
   * Aligns the dropdown content such that it opens to the top of the shell, extending up.
   * @deprecated
   * @type {boolean}
   */
  export let top = false;
  /**
   * Dropdown horizontal alignment relative to the shell.
   * @type {string}
   */
  export let horizontalAlignment = HorizontalAlignment.AUTO_START;
  /**
   * Dropdown vertical alignment relative to the shell.
   * @type {string}
   */
  export let verticalAlignment = VerticalAlignment.AUTO_BOTTOM;

  const isDropdownOpen = getContext(isDropdownOpenKey);
  const getDropdownShellBoundary = getContext(getDropdownShellBoundaryKey);

  let dropdownElement, isVerticalAlignTop, isHorizontalAlignEnd;

  function getIsVerticalAlignTop(dropdownBound, dropdownShellBound) {
    const { height } = dropdownBound;
    const { top, bottom } = dropdownShellBound;

    switch (verticalAlignment) {
      case VerticalAlignment.TOP:
        return true;
      case VerticalAlignment.BOTTOM:
        return false;
      case VerticalAlignment.AUTO_TOP:
        return height <= top;
      default:
        // auto-bottom by default
        return height > window.innerHeight - bottom;
    }
  }

  function getIsHorizontalAlignEnd(dropdownBound, dropdownShellBound) {
    const { width } = dropdownBound;
    const { left, right } = dropdownShellBound;

    switch (horizontalAlignment) {
      case HorizontalAlignment.END:
        return true;
      case HorizontalAlignment.START:
        return false;
      case HorizontalAlignment.AUTO_END:
        return width <= right;
      default:
        // auto-start by default
        return width > window.innerWidth - left;
    }
  }

  $: {
    if ($isDropdownOpen) {
      const dropdownBound = dropdownElement.getBoundingClientRect();
      const dropdownShellBound = getDropdownShellBoundary();

      isVerticalAlignTop =
        top || getIsVerticalAlignTop(dropdownBound, dropdownShellBound);

      isHorizontalAlignEnd =
        right || getIsHorizontalAlignEnd(dropdownBound, dropdownShellBound);
    }
  }
</script>

<div
  class:right={isHorizontalAlignEnd}
  class:top={isVerticalAlignTop}
  class={classes('dropdown', _class)}
  bind:this={dropdownElement}
>
  <slot />
</div>

<style src="./dropdown.scss">
</style>
