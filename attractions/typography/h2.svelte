<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
</script>

<h2 class={classes(_class)} {...$$restProps}>
  <slot />
</h2>

<style src="./h2.scss">
</style>
