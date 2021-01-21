<script>
  import classes from '../utils/classes.js';
  import MainAxisAlignment from './main-axis-alignment.js';
  import CrossAxisAlignment from './cross-axis-alignment.js';

  let _class = null;
  export { _class as class };

  /**
   * The main (horizontal) axis alignment (the `justify-content` Flexbox property).
   * @type {typeof import("../../layout").MainAxisAlignment}
   */
  export let justifyContent = MainAxisAlignment.START;
  /**
   * The cross (vertical) axis alignment (the `align-items` Flexbox property).
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
  class={classes('row', justifyContent, alignItems, _class)}
  class:reverse
  {...$$restProps}
>
  <slot />
</div>

<style src="./row.scss"></style>
