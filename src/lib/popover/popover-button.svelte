<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };

  const dispatch = createEventDispatcher<{
    click: { nativeEvent: MouseEvent };
  }>();
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
