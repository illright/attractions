<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from '../button/button.svelte';
  import ripple from '../utils/ripple.js';
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * A class string to add to the `<label>` element wrapping the `<input>`.
   */
  export let labelClass: string | false | null = null;

  /**
   * Allows the user to select multiple files.
   */
  export let multiple = false;
  /**
   * Decides if the _select a file_ and _clear selection_ buttons will be laid out in a row or a column (upload a file to see the two buttons).
   */
  export let vertical = false;
  /**
   * The user's selection. If `multiple` is `false`, the value is an actual `File` object, not a one-element `FileList`, as opposed to the native `<input type="file">`.
   */
  export let value: File | FileList | null = null;
  /**
   * Whether the input should accept files.
   */
  export let disabled = false;

  let input: HTMLInputElement;
  let files: FileList;
  $: handleOutsideClearing(value);
  $: value = multiple ? files || [] : files && files[0];

  function handleOutsideClearing(value: File | FileList | null) {
    if (value == null && input != null) {
      input.value = '';
    }
  }

  function clearSelection(e: CustomEvent<{ nativeEvent: MouseEvent }>) {
    value = null;
    input.value = '';
    dispatch('change', { value, nativeEvent: e });
  }

  const dispatch = createEventDispatcher<{
    change: { value: File | FileList | null; nativeEvent: Event };
  }>();
</script>

<span class={classes('file-input', _class)} class:vertical>
  <label class:disabled class={classes(labelClass)} use:ripple={{ disabled }}>
    <input
      type="file"
      bind:files
      bind:this={input}
      {multiple}
      {disabled}
      {...$$restProps}
      on:change={e => dispatch('change', { value, nativeEvent: e })}
    />
    <slot name="select-file-message">
      {#if multiple}
        select files
      {:else}
        select a file
      {/if}
    </slot>
  </label>
  {#if value != null && (value instanceof window.File || value.length !== 0)}
    <Button danger on:click={clearSelection}>clear selection</Button>
  {/if}
</span>

<style src="./file-input.scss">
</style>
