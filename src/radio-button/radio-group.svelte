<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../_utils/classes.js';
  import getColorPickerStyles from '../_utils/color-picker-styles.js';

  let _class = null;
  export { _class as class};
  export let wrapperClass = null;
  export let radioClass = null;
  export let inputClass = null;
  export let labelClass = null;
  export let iconClass = null;

  export let color = false;

  export let items;
  export let value = null;
  export let name;
  export let labelLeft = false;

  if (!items || items.length === 0) {
    console.error('Must have at least one item in the radio group');
  }

  if (color && labelClass != null) {
    console.warn('labelClass has no effect: labels are not rendered for color radio groups');
  }

  const dispatch = createEventDispatcher();
</script>

{#if items != null && items.length !== 0}
  <div class:with-labels={!color} class={_class} role="group">
    {#each items as item (item.value)}
      <label
        class:colored={color}
        class:radio={color}
        class={wrapperClass}
      >
        {#if !color && labelLeft}
          {#if labelClass != null}
            <span class={labelClass}>{item.label || item.value}</span>
          {:else}
            {item.label || item.value}
          {/if}
        {/if}
        {#if !color}
          <div class={classes('radio', radioClass)}>
            <input
              bind:group={value}
              value={item.value}
              type="radio"
              name={name}
              class={inputClass}
              disabled={item.disabled}
              on:change={() => dispatch('change', item)}
              {...$$restProps}
            />
            <div class={classes('icon', iconClass)} />
          </div>
        {:else}
          <input
            bind:group={value}
            value={item.value}
            type="radio"
            name={name}
            class={inputClass}
            disabled={item.disabled}
            on:change={() => dispatch('change', value)}
            {...$$restProps}
          />
          <div
            class={classes('icon', iconClass)}
            style={color ? getColorPickerStyles(item.value) : null}
          />
        {/if}
        {#if !color && !labelLeft}
          {#if labelClass != null}
            <span class={labelClass}>{item.label || item.value}</span>
          {:else}
            {item.label || item.value}
          {/if}
        {/if}
      </label>
    {/each}
  </div>
{/if}

<style src="./radio-button.scss"></style>
