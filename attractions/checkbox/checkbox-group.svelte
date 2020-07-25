<script>
  import classes from '../utils/classes.js';
  import getColorPickerStyles from '../utils/color-picker-styles.js';
  import s from '../utils/plural-s.js';
  import Checkbox from './checkbox.svelte';

  let _class = null;
  export { _class as class };
  export let checkboxClass = null;
  export let labelClass = null;

  export let color = false;

  export let items;
  export let name;
  export let labelsLeft = false;
  export let max = Infinity;

  $: currentChecked = items.reduce((acc, elt) => acc + elt.checked, 0);
  $: maxReachedTooltip = `Can only select ${max} value${s(max)}.`;

  if (!items || items.length === 0) {
    console.error('Must have at least one item in the checkbox group');
  }

  if (color && labelClass != null) {
    console.warn('labelClass has no effect: labels are not rendered for color checkbox groups');
  }
</script>

{#if items != null && items.length !== 0}
  <div class={_class} role="group">
    {#each items as item (item.value)}
      <Checkbox
        {name}
        slotLeft={labelsLeft}
        selectorStyle={color ? getColorPickerStyles(item.value) : null}
        value={item.value}
        bind:checked={item.checked}
        disabled={item.disabled || (!item.checked && currentChecked >= max)}
        class={classes(color && 'colored', checkboxClass)}
        title={
          !item.disabled
          && !item.checked
          && currentChecked >= max
          ? maxReachedTooltip : null
        }
        on:change
        {...$$restProps}
      >
        {#if !color}
          {#if labelClass != null}
            <span class={labelClass}>{item.label || item.value}</span>
          {:else}
            {item.label || item.value}
          {/if}
        {/if}
      </Checkbox>
    {/each}
  </div>
{/if}

<style src="./checkbox-group.scss"></style>
