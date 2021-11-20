<script>
  /**
   * @event {{ value: string; checked: boolean; nativeEvent: Event }} change
   * @extends {'./checkbox.svelte'} CheckboxProps
   */
  import classes from '../utils/classes.js';
  import getColorPickerStyles from '../utils/color-picker-styles.js';
  import s from '../utils/plural-s.js';
  import Checkbox from './checkbox.svelte';

  let _class = null;
  export { _class as class };
  /**
   * A class string to add to the `<Checkbox>` components.
   * @type {string | false | null}
   */
  export let checkboxClass = null;
  /**
   * A class string to assign to the labels' wrapping `<span>`s.
   * If this is not passed, the labels are not wrapped in a `<span>`.
   * @type {string | false | null}
   */
  export let labelClass = null;

  /**
   * Designates the checkboxes as color choices.
   * Labels are ignored and values are expected to be `"#RRGGBB"`.
   * @type {boolean}
   */
  export let color = false;

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
   * Places the labels to the left of the checkboxes.
   * @type {boolean}
   */
  export let labelsLeft = false;
  /**
   * The maximum allowed number of checkboxes to select.
   * @type {number}
   */
  export let max = Infinity;
  /**
   * The text displayed in the tooltip when hovering over the checkboxes
   *   after the maximum allowed selection has been reached.
   * Leaving it as `null` defaults to `Can only select ${max} value${s(max)}.`
   * @type {string | null}
   */
  export let maxReachedTooltip = null;
  $: maxReachedTooltipFinal =
    // TODO: switch back to `??` after https://github.com/pastelsky/bundlephobia/issues/530 is merged
    maxReachedTooltip || `Can only select ${max} value${s(max)}.`;

  $: currentChecked = items.reduce((acc, elt) => acc + elt.checked, 0);

  if (!items || items.length === 0) {
    console.error('Must have at least one item in the checkbox group');
  }

  if (color && labelClass != null) {
    console.warn(
      'labelClass has no effect: labels are not rendered for color checkbox groups'
    );
  }
</script>

{#if items != null && items.length !== 0}
  <div class={classes(_class)} role="group">
    {#each items as item (item.value)}
      <Checkbox
        {name}
        slotLeft={labelsLeft}
        selectorStyle={color ? getColorPickerStyles(item.value) : null}
        value={item.value}
        bind:checked={item.checked}
        disabled={item.disabled || (!item.checked && currentChecked >= max)}
        class={classes(color && 'colored', checkboxClass)}
        title={!item.disabled && !item.checked && currentChecked >= max
          ? maxReachedTooltipFinal
          : null}
        on:change
        {...$$restProps}
      >
        {#if !color}
          {#if labelClass != null}
            <span class={classes(labelClass)}>
              {item.label || item.value}
            </span>
          {:else}{item.label || item.value}{/if}
        {/if}
      </Checkbox>
    {/each}
  </div>
{/if}

<style src="./checkbox-group.scss">
</style>
