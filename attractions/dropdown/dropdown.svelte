<script context="module">
  export const HorizontalAlignment = {
    autoStart: 'auto-start',
    autoEnd: 'auto-end',
    start: 'start',
    end: 'end',
  };

  export const VerticalAlignment = {
    autoBottom: 'auto-bottom',
    autoTop: 'auto-top',
    bottom: 'bottom',
    top: 'top',
  };

  Object.freeze(HorizontalAlignment);
  Object.freeze(VerticalAlignment);
</script>

<script>
  import { getContext } from 'svelte';
  import classes from '../utils/classes.js';
  import {
    CONTEXT_DROPDOWN_SHELL,
    CONTEXT_IS_DROPDOWN_OPEN,
  } from './dropdown-shell.svelte';

  let _class = null;
  export { _class as class };
  /**
   * Aligns the dropdown content with the right edge of the shell.
   * @type {boolean}
   */
  export let right = false;
  /**
   * Aligns the dropdown content such that it opens to the top of the shell, extending up.
   * @type {boolean}
   */
  export let top = false;
  /**
   * Dropdown horizontal alignment relative to the shell.
   * @type {string}
   */
  export let horizontalAlignment = HorizontalAlignment.autoStart;
  /**
   * Dropdown vertical alignment relative to the shell.
   * @type {string}
   */
  export let verticalAlignment = VerticalAlignment.autoBottom;

  const isDropdownOpen = getContext(CONTEXT_IS_DROPDOWN_OPEN);
  const dropdownShellElement = getContext(CONTEXT_DROPDOWN_SHELL);

  let dropdownElement,
    screenWidth,
    screenHeight,
    isVerticalAlignTop,
    isHorizontalAlignEnd;

  function getIsVerticalAlignTop(dropdownBound, dropdownShellBound) {
    const { height } = dropdownBound;
    const { top, bottom } = dropdownShellBound;

    switch (verticalAlignment) {
      case VerticalAlignment.top:
        return true;
      case VerticalAlignment.bottom:
        return false;
      case VerticalAlignment.autoTop:
        return height <= top;
      default:
        // auto-bottom by default
        return height > screenHeight - bottom;
    }
  }

  function getIsHorizontalAlignEnd(dropdownBound, dropdownShellBound) {
    const { width } = dropdownBound;
    const { left, right } = dropdownShellBound;

    switch (horizontalAlignment) {
      case HorizontalAlignment.end:
        return true;
      case HorizontalAlignment.start:
        return false;
      case HorizontalAlignment.autoEnd:
        return width <= left;
      default:
        // auto-start by default
        return width > screenWidth - right;
    }
  }

  $: {
    if ($isDropdownOpen) {
      const dropdownBound = dropdownElement.getBoundingClientRect();
      const dropdownShellBound = $dropdownShellElement.getBoundingClientRect();

      isVerticalAlignTop =
        top || getIsVerticalAlignTop(dropdownBound, dropdownShellBound);

      isHorizontalAlignEnd =
        right || getIsHorizontalAlignEnd(dropdownBound, dropdownShellBound);
    }
  }
</script>

<svelte:window bind:innerHeight={screenHeight} bind:innerWidth={screenWidth} />

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
