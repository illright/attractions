<script>
  import classes from '../utils/classes.js';
  import MainAxisAlignment from './main-axis-alignment.js';
  import CrossAxisAlignment from './cross-axis-alignment.js';

  let _class = null;
  export { _class as class };

  /**
   * The main (vertical) axis alignment.
   * @type {typeof import("../../layout").MainAxisAlignment}
   */
  export let justifyContent = MainAxisAlignment.START;
  /**
   * The cross (horizontal) axis alignment.
   * @type {typeof import("../../layout").CrossAxisAlignment}
   */
  export let alignItems = CrossAxisAlignment.STRETCH;
  /**
   * Whether to reverse the direction of the flex axes.
   * @type {boolean}
   */
  export let reverse = false;
</script>

<div
  class={classes('column', justifyContent, alignItems, _class)}
  class:reverse
  {...$$restProps}
>
  <slot />
</div>

<style src="./column.scss"></style>
