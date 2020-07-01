<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let popoverClass = null;

  export let position;
</script>

<div class={classes('popover-container', _class)}>
  <slot />
  <div class={classes('popover', position, popoverClass)}>
    <slot name="popover-content" />
  </div>
</div>

<style src="./popover.scss"></style>
