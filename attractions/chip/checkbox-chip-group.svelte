<script>
  /**
   * @event {{ value: string; checked: boolean; nativeEvent: Event }} change
   * @extends {'./checkbox-chip.svelte'} CheckboxChipProps
   */
  import s from '../utils/plural-s.js';
  import classes from '../utils/classes.js';
  import CheckboxChip from './checkbox-chip.svelte';

  let _class = null;
  export { _class as class };
  /**
   * A class string to add to the `<CheckboxChip>` components inside.
   * @type {string | false | null}
   */
  export let checkboxClass = null;
  /**
   * A class string to add to the wrapping `<span>` around the chips' labels. If it's not specified, the `<span>` will not be added.
   * @type {string | false | null}
   */
  export let labelClass = null;

  /**
   * An array of items, where only the value field is required.
   * Must contain at least one value.
   * @type {Array<{ value: string; label?: string; checked?: boolean; disabled?: boolean }>}
   */
  export let items;
  /**
   * The name to assign to all checkboxes belonging to the same group.
   * Check [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname) for more information.
   * @type {string}
   */
  export let name;
  /**
   * The maximum allowed number of chips to select.
   * @type {number}
   */
  export let max = Infinity;
  /**
   * The text displayed in the tooltip when hovering over the checkboxes
   *   after the maximum allowed selection has been reached.
   * @type {string | null}
   */
  export let maxReachedTooltip = null;
  $: maxReachedTooltipFinal =
    // TODO: switch back to `??` after https://github.com/pastelsky/bundlephobia/issues/530 is merged
    maxReachedTooltip || `Can only select ${max} value${s(max)}.`;

  $: currentChecked = items.reduce((acc, elt) => acc + elt.checked, 0);

  if (!items || items.length === 0) {
    console.error('Must have at least one item in the checkbox chip group');
  }
</script>

{#if items != null && items.length !== 0}
  <div class={classes(_class)} role="group">
    {#each items as item (item.value)}
      <CheckboxChip
        {name}
        value={item.value}
        bind:checked={item.checked}
        disabled={item.disabled || (!item.checked && currentChecked >= max)}
        class={classes(checkboxClass)}
        title={!item.disabled && !item.checked && currentChecked >= max
          ? maxReachedTooltipFinal
          : null}
        on:change
        {...$$restProps}
      >
        {#if labelClass != null}
          <span class={classes(labelClass)}>{item.label || item.value}</span>
        {:else}{item.label || item.value}{/if}
      </CheckboxChip>
    {/each}
  </div>
{/if}

<style src="./chip-group.scss">
</style>
