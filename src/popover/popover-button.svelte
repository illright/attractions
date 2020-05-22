<script>
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };
</script>

<button type="button" class={classes('popover-button', _class)} on:click {...$$restProps}>
  <slot />
</button>

<style src="./popover-button.scss"></style>
