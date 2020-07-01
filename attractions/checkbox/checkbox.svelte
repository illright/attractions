<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let inputClass = null;
  export let iconClass = null;
  export let iconStyle = null;

  export let checked = false;
  export let value;
  export let disabled = false;
  export let slotLeft = false;
  export let round = false;
  export let title = null;

  const dispatch = createEventDispatcher();
</script>

<label class={classes('checkbox', _class)} class:round>
  {#if slotLeft}
    <slot />
  {/if}
  <input
    bind:checked
    {value}
    type="checkbox"
    class={inputClass}
    {disabled}
    on:change={(e) => dispatch('change', {
      value: e.target.value,
      checked: e.target.checked,
      nativeEvent: e,
    })}
    {...$$restProps}
  />
  <div class={classes('icon', iconClass)} style={iconStyle} {title} />
  {#if !slotLeft}
    <slot />
  {/if}
</label>

<style src="./checkbox.scss"></style>
