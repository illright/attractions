<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * Removes the internal padding for full control over the content.
   * @type {boolean}
   */
  export let tight = false;
  /**
   * Instead of emphasizing the card with a shadow, uses an outline.
   * @type {boolean}
   */
  export let outline = false;
</script>

<div
  class:outline
  class={classes('card', _class, tight && 'no-padding')}
  {...$$restProps}
>
  <slot />
</div>

<style src="./card.scss">
</style>
