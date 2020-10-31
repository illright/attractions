<svelte:options tag="a-radio-button" />

<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let inputClass = null;
  export let selectorClass = null;
  export let selectorStyle = null;

  export let value;
  export let disabled = false;
  export let group = null;
  export let slotLeft = false;
  export let title = null;

  const dispatch = createEventDispatcher();
</script>

<label class={classes('radio', _class)} {title}>
  {#if slotLeft}
    <slot />
  {/if}
  <input
    bind:group
    {value}
    type="radio"
    class={classes(inputClass)}
    {disabled}
    on:change={(e) => dispatch('change', { value, nativeEvent: e })}
    {...$$restProps}
  />
  <div class={classes('selector', selectorClass)} style={selectorStyle} />
  {#if !slotLeft}
    <slot />
  {/if}
</label>

<style src="./radio-button.scss"></style>
