<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * Makes the chip smaller.
   * @type {boolean}
   */
  export let small = false;
  /**
   * Adds a border to the chip instead of the background.
   * @type {boolean}
   */
  export let outline = false;
  /**
   * Clears the internal padding. Useful if you want to handle spacing yourself.
   * @type {boolean}
   */
  export let noPadding = false;
</script>

<div
  class:small
  class:outline
  class:no-padding={noPadding}
  class={classes('chip', _class)}
>
  <slot />
</div>

<style src="./chip.scss">
</style>
