<script>
  import { createEventDispatcher } from 'svelte';
  import Button from '../button/button.svelte';
  import ripple from '../_utils/ripple.js';
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };
  export let labelClass = null;

  export let multiple = false;
  export let vertical = false;
  export let value = multiple ? [] : null;

  let input;
  let files;
  $: value = multiple ? (files || []) : files && files[0];

  function clearSelection() {
    value = multiple ? [] : null;
    input.value = '';
    dispatch('change', { value });
  }

  const dispatch = createEventDispatcher();
</script>

<span class={classes('file-input', _class)} class:vertical>
  <label class={labelClass} use:ripple>
    <input
      type="file"
      bind:files
      bind:this={input}
      {multiple}
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
