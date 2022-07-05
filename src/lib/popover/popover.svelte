<script lang="ts">
  import classes from '../utils/classes.js';
  import PopoverPositions from './popover-positions.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * A class string to add to the popover.
   */
  export let popoverClass: string | false | null = null;

  /**
   * The position of the popover content relative to the triggering handle.
   */
  export let position: PopoverPositions = PopoverPositions.TOP;
</script>

<div class={classes('popover-container', _class)}>
  <slot />
  <div class={classes('popover', position, popoverClass)}>
    <slot name="popover-content" />
  </div>
</div>

<style src="./popover.scss">
</style>
