<script>
  /**
   * @event {{ value: string; nativeEvent: Event }} change
   */
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';
  import ripple from '../utils/ripple.js';

  let _class = null;
  export { _class as class };
  /**
   * A class string to add to the `<input>` element.
   * @type {string | false | null}
   */
  export let inputClass = null;
  /**
   * A class string to add to the underlying <Chip> component.
   * @type {string | false | null}
   */
  export let chipClass = null;

  /**
   * The value of this radio button. Included in events and can be bound to using `bind:group`.
   * @type {string}
   */
  export let value;
  /**
   * The name of the group to relate this radio chip to. Check [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname) for more information.
   * @type {string}
   */
  export let name;
  /**
   * Disables the chip and disallows selection.
   * @type {boolean}
   */
  export let disabled = false;
  /**
   * The currently selected value among the radio chips with the same name. Often used with a two-way binding: `bind:group`.
   * @type {string | null}
   */
  export let group = null;
  /**
   * The tooltip to give to a chip.
   * @type {string | null}
   */
  export let title = null;

  /**
   * Makes the chip smaller.
   * @type {boolean}
   */
  export let small = false;
  /**
   * Adds a border to the chip instead of the background.
   * @type {boolean}
   */
  export let outline = false;
  /**
   * Clears the internal padding. Useful if you want to handle spacing yourself.
   * @type {boolean}
   */
  export let noPadding = false;

  const dispatch = createEventDispatcher();
</script>

<label class={classes('input-chip radio-chip', _class)}>
  <input
    bind:group
    {value}
    {name}
    type="radio"
    class={classes(inputClass)}
    {disabled}
    on:change={e => dispatch('change', { value, nativeEvent: e })}
    {...$$restProps}
  />
  <div
    class:small
    class:outline
    class:no-padding={noPadding}
    {title}
    use:ripple={{ disabled }}
    class={classes('chip', chipClass)}
  >
    <slot>{value}</slot>
  </div>
</label>

<style src="./radio-chip.scss">
</style>
