<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * Aligns the dropdown content with the right edge of the shell.
   * @type {boolean}
   */
  export let right = false;
  /**
   * Aligns the dropdown content such that it opens to the top of the shell, extending up.
   * @type {boolean}
   */
  export let top = false;
</script>

<div class:right class:top class={classes('dropdown', _class)}>
  <slot />
</div>

<style src="./dropdown.scss">
</style>
