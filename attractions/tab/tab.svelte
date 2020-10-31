<svelte:options tag="a-tab" />

<script>
  import { createEventDispatcher } from 'svelte';
  import rippleEffect from '../utils/ripple.js';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let inputClass = null;
  export let contentClass = null;

  export let value;
  export let name = null;
  export let group = null;
  export let disabled = false;
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
    on:change={(e) => dispatch('change', { value, nativeEvent: e })}
    on:click={(e) => dispatch('click', { nativeEvent: e })}
    {...$$restProps}
  />
  <div class={classes('content', contentClass)} use:rippleEffect={{ disabled: noRipple || disabled }}>
    <slot>{value}</slot>
  </div>
</label>

<style src="./tab.scss"></style>
