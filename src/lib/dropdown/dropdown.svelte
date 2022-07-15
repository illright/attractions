<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import classes from '../utils/classes.js';
  import {
    HorizontalAlignment,
    VerticalAlignment,
  } from './dropdown-alignment.js';
  import {
    getDropdownShellBoundaryKey,
    isDropdownOpenKey,
  } from './dropdown-context-key';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * Dropdown horizontal alignment relative to the shell.
   */
  export let horizontalAlignment: HorizontalAlignment =
    HorizontalAlignment.AUTO_START;
  /**
   * Dropdown vertical alignment relative to the shell.
   */
  export let verticalAlignment: VerticalAlignment =
    VerticalAlignment.AUTO_BOTTOM;

  const isDropdownOpen = getContext<Writable<boolean>>(isDropdownOpenKey);
  const getDropdownShellBoundary = getContext<() => DOMRect>(
    getDropdownShellBoundaryKey
  );

  let dropdownElement: HTMLDivElement;
  let isVerticalAlignTop: boolean;
  let isHorizontalAlignEnd: boolean;

  function getIsVerticalAlignTop(
    dropdownBound: DOMRect,
    dropdownShellBound: DOMRect
  ) {
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

  function getIsHorizontalAlignEnd(
    dropdownBound: DOMRect,
    dropdownShellBound: DOMRect
  ) {
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

      isVerticalAlignTop = getIsVerticalAlignTop(
        dropdownBound,
        dropdownShellBound
      );

      isHorizontalAlignEnd = getIsHorizontalAlignEnd(
        dropdownBound,
        dropdownShellBound
      );
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
