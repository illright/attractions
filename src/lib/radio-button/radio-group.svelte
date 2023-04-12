<script lang="ts">
  /**
   * @event {{ value: string; nativeEvent: Event }} change
   * @extends {'./radio-button.svelte'} RadioButtonProps
   */
  import classes from '../utils/classes.js';
  import getColorPickerStyles from '../utils/color-picker-styles.js';
  import RadioButton from './radio-button.svelte';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * A class string to add to the `<RadioButton>` components.
   */
  export let radioClass: string | false | null = null;
  /**
   * A class string to assign to the labels' wrapping `<span>`s.
   * If this is not passed, the labels are not wrapped in a `<span>`.
   */
  export let labelClass: string | false | null = null;

  /**
   * Designates the radio buttons as color choices. Labels are ignored and values are expected to be `"#RRGGBB"`.
   */
  export let color = false;

  /**
   * An array of objects, where only the `value` field is required. Must contain at least one value.
   */
  export let items: Array<{
    value: string;
    label?: string;
    disabled?: boolean;
  }>;
  /**
   * The currently selected value of the group.
   */
  export let value: string | null = null;
  /**
   * The name to assign to all radio buttons belonging to the same group. Check [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname) for more information.
   */
  export let name: string;
  /**
   * Places the labels to the left of the radio buttons.
   */
  export let labelsLeft = false;

  if (!items || items.length === 0) {
    console.error('Must have at least one item in the radio group');
  }

  if (color && labelClass != null) {
    console.warn(
      'labelClass has no effect: labels are not rendered for color radio groups'
    );
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
          {:else}{item.label || item.value}{/if}
        {/if}
      </RadioButton>
    {/each}
  </div>
{/if}

<style src="./radio-group.scss">
</style>
