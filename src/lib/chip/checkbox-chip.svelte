<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * A class string to add to the `<input>` element.
   */
  export let inputClass: string | false | null = null;
  /**
   * A class string to add to the underlying `<Chip>` component.
   */
  export let chipClass: string | false | null = null;

  /**
   * Whether the chip is selected or not.
   */
  export let checked = false;
  /**
   * The value of this checkbox. Check [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value) for more information.
   */
  export let value: string;
  /**
   * The name of the group to relate this checkbox chip to. Check [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname) for more information.
   */
  export let name: string;
  /**
   * Disables the chip and disallows selection.
   */
  export let disabled = false;
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
    change: { value: string; checked: boolean; nativeEvent: Event };
  }>();
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
        value: e.currentTarget.value,
        checked: e.currentTarget.checked,
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
