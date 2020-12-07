<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
</script>

<div class={classes('headline', _class)} {...$$restProps}>
  <slot />
</div>

<style src="./headline.scss">
</style>
