<script>
  import s from '../utils/plural-s.js';
  import classes from '../utils/classes.js';
  import CheckboxChip from './checkbox-chip.svelte';

  let _class = null;
  export { _class as class };
  export let checkboxClass = null;
  export let labelClass = null;

  export let items;
  export let name;
  export let max = Infinity;

  $: currentChecked = items.reduce((acc, elt) => acc + elt.checked, 0);
  $: maxReachedTooltip = `Can only select ${max} value${s(max)}.`;

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
          ? maxReachedTooltip
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
