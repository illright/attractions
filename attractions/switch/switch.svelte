<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let inputClass = null;
  export let trackClass = null;
  export let thumbClass = null;

  export let value = false;
  export let disabled = false;
  export let slotLeft = false;

  const dispatch = createEventDispatcher();
</script>

<label class={classes('switch', _class)}>
  {#if slotLeft}
    <slot />
  {/if}
  <input
    bind:checked={value}
    type="checkbox"
    class={inputClass}
    {disabled}
    on:change={(e) => dispatch('change', { value: e.target.checked, nativeEvent: e })}
    {...$$restProps}
  />
  <div class={classes('track', trackClass)}>
    <div class={classes('thumb', thumbClass)} />
  </div>
  {#if !slotLeft}
    <slot />
  {/if}
</label>

<style src="./switch.scss"></style>
