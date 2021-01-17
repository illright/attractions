<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * Whether the badge is shown or hidden. Useful for controlling its appearance without modifying the DOM tree.
   * @type {boolean}
   */
  export let hidden = false;
</script>

<div class={classes('badge', _class)} class:hidden {...$$restProps}>
  <slot />
</div>

<style src="./badge.scss">
</style>
