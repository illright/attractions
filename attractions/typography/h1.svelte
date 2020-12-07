<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
</script>

<h1 class={classes(_class)} {...$$restProps}>
  <slot />
</h1>

<style src="./h1.scss">
</style>
