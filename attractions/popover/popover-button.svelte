<script>
  /**
   * @event {{ nativeEvent: MouseEvent }} click
   */
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };

  const dispatch = createEventDispatcher();
</script>

<button
  type="button"
  class={classes('popover-button', _class)}
  on:click={e => dispatch('click', { nativeEvent: e })}
  {...$$restProps}
>
  <slot />
</button>

<style src="./popover-button.scss">
</style>
