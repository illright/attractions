<script>
  /**
   * @event {{ value: boolean; nativeEvent: Event }} change
   */
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * A class string to add to the `<input>` inside.
   * @type {string | false | null}
   */
  export let inputClass = null;
  /**
   * A class string to add to the [track](https://material.io/components/selection-controls#switches) of the switch.
   * @type {string | false | null}
   */
  export let trackClass = null;
  /**
   * A class string to add to the [thumb](https://material.io/components/selection-controls#switches) of the switch.
   * @type {string | false | null}
   */
  export let thumbClass = null;

  /**
   * Whether the switch is currently on.
   * @type {boolean}
   */
  export let value = false;
  /**
   * Disables the switch.
   * @type {boolean}
   */
  export let disabled = false;
  /**
   * Whether to place the default slot to the left of the switch or to the right.
   * @type {boolean}
   */
  export let slotLeft = false;

  const dispatch = createEventDispatcher();
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
        value: e.target.checked,
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
