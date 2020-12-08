<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
</script>

<h3 class={classes(_class)} {...$$restProps}>
  <slot />
</h3>

<style src="./h3.scss">
</style>
