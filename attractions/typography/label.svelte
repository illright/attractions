<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * Makes the `<Label>` smaller.
   * @type {boolean}
   */
  export let small = false;
</script>

<div class={classes('label', _class)} class:small {...$$restProps}>
  <slot />
</div>

<style src="./label.scss">
</style>
