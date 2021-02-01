<script>
  /**
   * @event {{ value: string; nativeEvent: Event }} change
   */
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * A class string to assign to the `<input>` element.
   * @type {string | false | null}
   */
  export let inputClass = null;
  /**
   * A class string to add to the selector circle.
   * @type {string | false | null}
   */
  export let selectorClass = null;
  /**
   * A CSS style string to assign to the selector circle.
   * Can be used to make the radio button represent a color (in conjunction with the `getColorPickerStyles` utility).
   * @type {string | null}
   */
  export let selectorStyle = null;

  /**
   * The value assigned to the radio button input. Check [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value) for more information.
   * @type {string}
   */
  export let value;
  /**
   * Disables the radio button.
   * @type {boolean}
   */
  export let disabled = false;
  /**
   * The value of the currently selected radio button in the `name` group.
   * Similar to Svelte's `bind:group` binding on native radio buttons.
   * @type {string | null}
   */
  export let group = null;
  /**
   * Places the default slot (label) to the left of the radio button.
   * @type {boolean}
   */
  export let slotLeft = false;
  /**
   * Adds a tooltip to the radio button.
   * @type {string | null}
   */
  export let title = null;

  const dispatch = createEventDispatcher();
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
