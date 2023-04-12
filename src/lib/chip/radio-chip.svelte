<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';
  import ripple from '../utils/ripple.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * A class string to add to the `<input>` element.
   */
  export let inputClass: string | false | null = null;
  /**
   * A class string to add to the underlying <Chip> component.
   */
  export let chipClass: string | false | null = null;

  /**
   * The value of this radio button. Included in events and can be bound to using `bind:group`.
   */
  export let value: string;
  /**
   * The name of the group to relate this radio chip to. Check [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname) for more information.
   */
  export let name: string;
  /**
   * Disables the chip and disallows selection.
   */
  export let disabled = false;
  /**
   * The currently selected value among the radio chips with the same name. Often used with a two-way binding: `bind:group`.
   */
  export let group: string | null = null;
  /**
   * The tooltip to give to a chip.
   */
  export let title: string | null = null;

  /**
   * Makes the chip smaller.
   */
  export let small = false;
  /**
   * Adds a border to the chip instead of the background.
   */
  export let outline = false;
  /**
   * Clears the internal padding. Useful if you want to handle spacing yourself.
   */
  export let noPadding = false;

  const dispatch = createEventDispatcher<{
    change: { value: string; nativeEvent: Event };
  }>();
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
