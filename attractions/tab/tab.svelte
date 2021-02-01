<script>
  /**
   * @event {{ value: string; nativeEvent: Event }} change
   * @event {{ nativeEvent: MouseEvent }} click
   */
  import { createEventDispatcher } from 'svelte';
  import rippleEffect from '../utils/ripple.js';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * A class string to assign to the `<input>` element.
   * @type {string | false | null}
   */
  export let inputClass = null;
  /**
   * A class string to add to the content of the tab.
   * @type {string | false | null}
   */
  export let contentClass = null;

  /**
   * The value assigned to the `<input type="radio">`. Check [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value) for more information.
   * @type {string}
   */
  export let value;
  /**
   * The name assigned to the `<input type="radio">`'s [name attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   * @type {string | null}
   */
  export let name = null;
  /**
   * The `value` of the currently selected tab. Use with `bind:group`.
   * @type {string | null}
   */
  export let group = null;
  /**
   * Disallows selecting this tab.
   * @type {boolean}
   */
  export let disabled = false;
  /**
   * Disables the ripple on the tab when clicking on it.
   * @type {boolean}
   */
  export let noRipple = false;

  const dispatch = createEventDispatcher();
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
