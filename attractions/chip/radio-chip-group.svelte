<script>
  /**
   * @event {{ value: string; nativeEvent: Event }} change
   * @extends {'./radio-chip.svelte'} RadioChipProps
   */
  import classes from '../utils/classes.js';
  import RadioChip from './radio-chip.svelte';

  let _class = null;
  export { _class as class };
  /**
   * A class string to add to the `<RadioChip>` components inside.
   * @type {string | false | null}
   */
  export let radioClass = null;
  /**
   * A class string to add to the wrapping `<span>` around the chips' labels. If it's not specified, the `<span>` will not be added.
   * @type {string | false | null}
   */
  export let labelClass = null;

  /**
   * An array of items, where only the value field is required.
   * Must contain at least one value.
   * @type {Array<{ value: string; label?: string; disabled?: boolean }>}
   */
  export let items;
  /**
   * The currently selected value of the group.
   * @type {string | null}
   */
  export let value = null;
  /**
   * The name of this radio button group. Check [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname) for more information.
   * @type {string}
   */
  export let name;

  if (!items || items.length === 0) {
    console.error('Must have at least one item in the radio chip group');
  }
</script>

{#if items != null && items.length !== 0}
  <div class={classes(_class)} role="radiogroup">
    {#each items as item (item.value)}
      <RadioChip
        {name}
        bind:group={value}
        value={item.value}
        disabled={item.disabled}
        class={classes(radioClass)}
        on:change
        {...$$restProps}
      >
        {#if labelClass != null}
          <span class={classes(labelClass)}>{item.label || item.value}</span>
        {:else}{item.label || item.value}{/if}
      </RadioChip>
    {/each}
  </div>
{/if}

<style src="./chip-group.scss">
</style>
