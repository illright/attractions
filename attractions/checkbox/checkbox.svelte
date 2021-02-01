<script>
  /**
   * @event {{ value: string; checked: boolean; nativeEvent: Event }} change
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
   * A class string to add to the selector box element.
   * @type {string | false | null}
   */
  export let selectorClass = null;
  /**
   * A CSS style string to assign to the selector box element.
   * Can be used to make the checkbox represent a color (in conjunction with the [`getColorPickerStyles`](https://illright.github.io/attractions/docs/utilities) utility).
   * @type {string | null}
   */
  export let selectorStyle = null;

  /**
   * Whether the checkbox is checked or not.
   * @type {boolean}
   */
  export let checked = false;
  /**
   * The value assigned to the checkbox input. Check [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value) for more information.
   * @type {string}
   */
  export let value;
  /**
   * Disables the checkbox, freezing its current `checked` state.
   * @type {boolean}
   */
  export let disabled = false;
  /**
   * Places the default slot (label) to the left of the checkbox.
   * @type {boolean}
   */
  export let slotLeft = false;
  /**
   * Makes the checkbox round (and slightly larger).
   * @type {boolean}
   */
  export let round = false;
  /**
   * Adds a tooltip to the checkbox.
   * @type {string | null}
   */
  export let title = null;

  const dispatch = createEventDispatcher();
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
        value: e.target.value,
        checked: e.target.checked,
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
