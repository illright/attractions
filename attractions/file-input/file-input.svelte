<script>
  import { createEventDispatcher } from 'svelte';
  import Button from '../button/button.svelte';
  import ripple from '../utils/ripple.js';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let labelClass = null;

  export let multiple = false;
  export let vertical = false;
  export let value = multiple ? [] : null;
  export let disabled = false;

  let input;
  let files;
  $: handleOutsideClearing(value);
  $: value = multiple ? (files || []) : files && files[0];

  function handleOutsideClearing(value) {
    if (value == null && input != null) {
      input.value = '';
    }
  }

  function clearSelection() {
    value = multiple ? [] : null;
    input.value = '';
    dispatch('change', { value });
  }

  const dispatch = createEventDispatcher();
</script>

<span class={classes('file-input', _class)} class:vertical>
  <label class:disabled class={labelClass} use:ripple={{ disabled }}>
    <input
      type="file"
      bind:files
      bind:this={input}
      {multiple}
      {disabled}
      {...$$restProps}
      on:change={(e) => dispatch('change', { value, nativeEvent: e })}
    />
    <slot>{multiple ? 'select files' : 'select a file'}</slot>
  </label>
  {#if value != null && value.length !== 0}
    <Button danger on:click={clearSelection}>clear selection</Button>
  {/if}
</span>

<style src="./file-input.scss"></style>
