<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };
  export let inputClass = null;
  export let iconClass = null;
  export let iconStyle = null;

  export let value;
  export let disabled = false;
  export let group = null;
  export let slotLeft = false;

  const dispatch = createEventDispatcher();
</script>

<label class={classes('radio', _class)}>
  {#if slotLeft}
    <slot />
  {/if}
  <input
    bind:group
    {value}
    type="radio"
    class={inputClass}
    {disabled}
    on:change={() => dispatch('change', { value, nativeEvent: e })}
    {...$$restProps}
  />
  <div class={classes('icon', iconClass)} style={iconStyle} />
  {#if !slotLeft}
    <slot />
  {/if}
</label>

<style src="./radio-button.scss"></style>
