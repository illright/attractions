<script>
  /**
   * @event {{ value: string; checked: boolean; nativeEvent: Event }} change
   */
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * A class string to add to the `<input>` element.
   * @type {string | false | null}
   */
  export let inputClass = null;
  /**
   * A class string to add to the underlying `<Chip>` component.
   * @type {string | false | null}
   */
  export let chipClass = null;

  /**
   * Whether the chip is selected or not.
   * @type {boolean}
   */
  export let checked = false;
  /**
   * The value of this checkbox. Check [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value) for more information.
   * @type {string}
   */
  export let value;
  /**
   * The name of the group to relate this checkbox chip to. Check [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname) for more information.
   * @type {string}
   */
  export let name;
  /**
   * Disables the chip and disallows selection.
   * @type {boolean}
   */
  export let disabled = false;
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

<label class={classes('input-chip checkbox-chip', _class)}>
  <input
    bind:checked
    {value}
    {name}
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
  <div
    class:small
    class:outline
    class:no-padding={noPadding}
    {title}
    class={classes('chip', chipClass)}
  >
    <slot>{value}</slot>
  </div>
</label>

<style src="./checkbox-chip.scss">
</style>
