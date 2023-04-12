<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * A class string to add to the `<input>` inside.
   */
  export let inputClass: string | false | null = null;
  /**
   * A class string to add to the [track](https://material.io/components/selection-controls#switches) of the switch.
   */
  export let trackClass: string | false | null = null;
  /**
   * A class string to add to the [thumb](https://material.io/components/selection-controls#switches) of the switch.
   */
  export let thumbClass: string | false | null = null;

  /**
   * Whether the switch is currently on.
   */
  export let value = false;
  /**
   * Disables the switch.
   */
  export let disabled = false;
  /**
   * Whether to place the default slot to the left of the switch or to the right.
   */
  export let slotLeft = false;

  const dispatch = createEventDispatcher<{
    change: { value: boolean; nativeEvent: Event };
  }>();
</script>

<label class={classes('switch', _class)}>
  {#if slotLeft}
    <slot />
  {/if}
  <input
    bind:checked={value}
    type="checkbox"
    class={classes(inputClass)}
    {disabled}
    on:change={e =>
      dispatch('change', {
        value: e.currentTarget.checked,
        nativeEvent: e,
      })}
    {...$$restProps}
  />
  <div class={classes('track', trackClass)}>
    <div class={classes('thumb', thumbClass)} />
  </div>
  {#if !slotLeft}
    <slot />
  {/if}
</label>

<style src="./switch.scss">
</style>
