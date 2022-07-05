<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * A class string to assign to the `<input>` element.
   */
  export let inputClass: string | false | null = null;
  /**
   * A class string to add to the selector box element.
   */
  export let selectorClass: string | false | null = null;
  /**
   * A CSS style string to assign to the selector box element.
   * Can be used to make the checkbox represent a color (in conjunction with the [`getColorPickerStyles`](https://illright.github.io/attractions/docs/utilities) utility).
   */
  export let selectorStyle: string | null = null;

  /**
   * Whether the checkbox is checked or not.
   */
  export let checked = false;
  /**
   * The value assigned to the checkbox input. Check [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value) for more information.
   */
  export let value: string;
  /**
   * Disables the checkbox, freezing its current `checked` state.
   */
  export let disabled = false;
  /**
   * Places the default slot (label) to the left of the checkbox.
   */
  export let slotLeft = false;
  /**
   * Makes the checkbox round (and slightly larger).
   */
  export let round = false;
  /**
   * Adds a tooltip to the checkbox.
   */
  export let title: string | null = null;

  const dispatch = createEventDispatcher<{
    change: { value: string; checked: boolean; nativeEvent: Event };
  }>();
</script>

<label class={classes('checkbox', _class)} class:round {title}>
  {#if slotLeft}
    <slot />
  {/if}
  <input
    bind:checked
    {value}
    type="checkbox"
    class={classes(inputClass)}
    {disabled}
    on:change={e =>
      dispatch('change', {
        value: e.currentTarget.value,
        checked: e.currentTarget.checked,
        nativeEvent: e,
      })}
    {...$$restProps}
  />
  <div class={classes('selector', selectorClass)} style={selectorStyle} />
  {#if !slotLeft}
    <slot />
  {/if}
</label>

<style src="./checkbox.scss">
</style>
