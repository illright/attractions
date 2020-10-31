<svelte:options tag="a-radio-chip-group" />

<script>
  import classes from '../utils/classes.js';
  import RadioChip from './radio-chip.svelte';

  let _class = null;
  export { _class as class };
  export let radioClass = null;
  export let labelClass = null;

  export let items;
  export let value = null;
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
        {:else}
          {item.label || item.value}
        {/if}
      </RadioChip>
    {/each}
  </div>
{/if}

<style src="./chip-group.scss"></style>
