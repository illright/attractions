<svelte:options tag="a-popover" />

<script>
  import classes from '../utils/classes.js';
  import PopoverPositions from './popover-positions.js';

  let _class = null;
  export { _class as class };
  export let popoverClass = null;

  export let position = PopoverPositions.TOP;
</script>

<div class={classes('popover-container', _class)}>
  <slot />
  <div class={classes('popover', position, popoverClass)}>
    <slot name="popover-content" />
  </div>
</div>

<style src="./popover.scss"></style>
