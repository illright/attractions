<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import rippleEffect from '../utils/ripple.js';
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * A class string to assign to the `<input>` element.
   */
  export let inputClass: string | false | null = null;
  /**
   * A class string to add to the content of the tab.
   */
  export let contentClass: string | false | null = null;

  // Until `$$Generic` is supported by svelte2tsx - https://github.com/sveltejs/rfcs/pull/38
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type T = any;
  /**
   * The value assigned to the `<input type="radio">`. Check [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value) for more information.
   */
  export let value: T;
  /**
   * The name assigned to the `<input type="radio">`'s [name attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  export let name: string | null = null;
  /**
   * The `value` of the currently selected tab. Use with `bind:group`.
   * Must have the same type as the `value` prop.
   */
  export let group: T | null = null;
  /**
   * Disallows selecting this tab.
   */
  export let disabled = false;
  /**
   * Disables the ripple on the tab when clicking on it.
   */
  export let noRipple = false;

  const dispatch = createEventDispatcher<{
    change: { value: T; nativeEvent: Event };
    click: { nativeEvent: MouseEvent };
  }>();
</script>

<label class={classes('tab', _class)}>
  <input
    bind:group
    {value}
    {name}
    type="radio"
    class={classes(inputClass)}
    {disabled}
    on:change={e => dispatch('change', { value, nativeEvent: e })}
    on:click={e => dispatch('click', { nativeEvent: e })}
    {...$$restProps}
  />
  <div
    class={classes('content', contentClass)}
    use:rippleEffect={{ disabled: noRipple || disabled }}
  >
    <slot>{value}</slot>
  </div>
</label>

<style src="./tab.scss">
</style>
