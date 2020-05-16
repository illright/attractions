<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };
  export let inputClass = null;
  export let contentClass = null;

  export let value;
  export let group = null;
  export let disabled = false;

  const dispatch = createEventDispatcher();
</script>

<label class={classes('tab', _class)}>
  <input
    bind:group
    {value}
    type="radio"
    class={inputClass}
    {disabled}
    on:change={(e) => dispatch('change', { value, nativeEvent: e })}
    {...$$restProps}
  />
  <div class={classes('content', contentClass)}>
    <slot>{value}</slot>
  </div>
</label>

<style src="./tab.scss"></style>
