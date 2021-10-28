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
  import classes from '../utils/classes.js';

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
</script>

<div
  class:right={right || horizontalAlignment === HorizontalAlignment.end}
  class:top={top || verticalAlignment === VerticalAlignment.top}
  class={classes('dropdown', _class)}
>
  <slot />
</div>

<style src="./dropdown.scss">
</style>
