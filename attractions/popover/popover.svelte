<script>
  import classes from '../utils/classes.js';
  import PopoverPositions from './popover-positions.js';

  let _class = null;
  export { _class as class };
  /**
   * A class string to add to the popover.
   * @type {string | false | null}
   */
  export let popoverClass = null;

  /**
   * The position of the popover content relative to the triggering handle.
   * @typedef {typeof import('./popover-positions').default} PopoverPositions
   * @type {PopoverPositions[keyof PopoverPositions]}
   */
  export let position = PopoverPositions.TOP;
</script>

<div class={classes('popover-container', _class)}>
  <slot />
  <div class={classes('popover', position, popoverClass)}>
    <slot name="popover-content" />
  </div>
</div>

<style src="./popover.scss">
</style>
