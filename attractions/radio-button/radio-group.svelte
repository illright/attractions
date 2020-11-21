<script>
  import classes from '../utils/classes.js';
  import getColorPickerStyles from '../utils/color-picker-styles.js';
  import RadioButton from './radio-button.svelte';

  let _class = null;
  export { _class as class };
  export let radioClass = null;
  export let labelClass = null;

  export let color = false;

  export let items;
  export let value = null;
  export let name;
  export let labelsLeft = false;

  if (!items || items.length === 0) {
    console.error('Must have at least one item in the radio group');
  }

  if (color && labelClass != null) {
    console.warn('labelClass has no effect: labels are not rendered for color radio groups');
  }
</script>

{#if items != null && items.length !== 0}
  <div class={classes(_class)} role="radiogroup">
    {#each items as item (item.value)}
      <RadioButton
        {name}
        slotLeft={labelsLeft}
        selectorStyle={color ? getColorPickerStyles(item.value) : null}
        bind:group={value}
        value={item.value}
        disabled={item.disabled}
        class={classes(color && 'colored', radioClass)}
        on:change
        {...$$restProps}
      >
        {#if !color}
          {#if labelClass != null}
            <span class={classes(labelClass)}>{item.label || item.value}</span>
          {:else}
            {item.label || item.value}
          {/if}
        {/if}
      </RadioButton>
    {/each}
  </div>
{/if}

<style src="./radio-group.scss"></style>
