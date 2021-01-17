<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };

  /**
   * Applies the `$info` color to the dot.
   * @type {boolean}
   */
  export let info = false;
  /**
   * Applies the `$attention` color to the dot.
   * @type {boolean}
   */
  export let attention = false;
  /**
   * Applies the `$danger` color to the dot.
   * @type {boolean}
   */
  export let danger = false;
  /**
   * Applies the `$success` color to the dot.
   * @type {boolean}
   */
  export let success = false;

  /**
   * Decreases the size of the dot.
   * @type {boolean}
   */
  export let small = false;

  if (info + attention + danger + success > 1) {
    console.warn(
      'A dot can either be info, attention, danger or success, not several of them'
    );
  }
</script>

<div
  class={classes('dot', _class)}
  class:info
  class:attention
  class:success
  class:danger
  class:small
  {...$$restProps}
/>

<style src="./dot.scss">
</style>
