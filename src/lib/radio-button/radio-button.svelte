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
   * A class string to add to the selector circle.
   */
  export let selectorClass: string | false | null = null;
  /**
   * A CSS style string to assign to the selector circle.
   * Can be used to make the radio button represent a color (in conjunction with the `getColorPickerStyles` utility).
   */
  export let selectorStyle: string | null = null;

  /**
   * The value assigned to the radio button input. Check [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value) for more information.
   */
  export let value: string;
  /**
   * Disables the radio button.
   */
  export let disabled = false;
  /**
   * The value of the currently selected radio button in the `name` group.
   * Similar to Svelte's `bind:group` binding on native radio buttons.
   */
  export let group: string | null = null;
  /**
   * Places the default slot (label) to the left of the radio button.
   */
  export let slotLeft = false;
  /**
   * Adds a tooltip to the radio button.
   */
  export let title: string | null = null;

  const dispatch = createEventDispatcher<{
    change: { value: string; nativeEvent: Event };
  }>();
</script>

<label class={classes('radio', _class)} {title}>
  {#if slotLeft}
    <slot />
  {/if}
  <input
    bind:group
    {value}
    type="radio"
    class={classes(inputClass)}
    {disabled}
    on:change={e => dispatch('change', { value, nativeEvent: e })}
    {...$$restProps}
  />
  <div class={classes('selector', selectorClass)} style={selectorStyle} />
  {#if !slotLeft}
    <slot />
  {/if}
</label>

<style src="./radio-button.scss">
</style>
