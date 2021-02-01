<script>
  /**
   * @event {{ value: File | FileList; nativeEvent: Event }} change
   */
  import { createEventDispatcher } from 'svelte';
  import Button from '../button/button.svelte';
  import ripple from '../utils/ripple.js';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * A class string to add to the `<label>` element wrapping the `<input>`.
   * @type {string | false | null}
   */
  export let labelClass = null;

  /**
   * Allows the user to select multiple files.
   * @type {boolean}
   */
  export let multiple = false;
  /**
   * Decides if the _select a file_ and _clear selection_ buttons will be laid out in a row or a column (upload a file to see the two buttons).
   * @type {boolean}
   */
  export let vertical = false;
  /**
   * The user's selection. If `multiple` is `false`, the value is an actual `File` object, not a one-element `FileList`, as opposed to the native `<input type="file">`.
   * @type {File | FileList | null}
   */
  export let value = multiple ? [] : null;
  /**
   * Whether the input should accept files.
   * @type {boolean}
   */
  export let disabled = false;

  let input;
  let files;
  $: handleOutsideClearing(value);
  $: value = multiple ? files || [] : files && files[0];

  function handleOutsideClearing(value) {
    if (value == null && input != null) {
      input.value = '';
    }
  }

  function clearSelection(e) {
    value = multiple ? [] : null;
    input.value = '';
    dispatch('change', { value, nativeEvent: e });
  }

  const dispatch = createEventDispatcher();
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
    <slot>{multiple ? 'select files' : 'select a file'}</slot>
  </label>
  {#if value != null && value.length !== 0}
    <Button danger on:click={clearSelection}>clear selection</Button>
  {/if}
</span>

<style src="./file-input.scss">
</style>
