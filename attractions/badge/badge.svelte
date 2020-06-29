<script>
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };
  export let hidden = false;
</script>

<div class={classes('badge', _class)} class:hidden {...$$restProps}>
  <slot />
</div>

<style src="./badge.scss"></style>
