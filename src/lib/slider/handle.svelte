<script>
  import { createEventDispatcher } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { sineOut } from 'svelte/easing';
  import { handleStyle } from './actions';
  import { calcPercentOfRange } from './utils';

  const dispatch = createEventDispatcher();

  /**
   * @type {number}
   */
  export let value;
  /**
   * @type {number}
   */
  export let min;
  /**
   * @type {number}
   */
  export let max;
  /**
   * @type {boolean}
   */
  export let active;
  /**
   * @type {boolean}
   */
  export let disabled = false;
  /**
   * @type {number}
   */
  export let tabIndex = 0;
  /**
   * @type {boolean}
   */
  export let vertical = false;

  /**
   * @type {boolean}
   */
  let focus = false;
  /**
   * @type {boolean}
   */
  let hovered = false;
  /**
   * @type {HTMLDivElement}
   */
  let handle;
  /**
   * focus on keydown
   * @param {Event} _e
   */
  function handleKeyDown(_e) {
    focus = false;
  }
  /**
   * focus on mousedown
   * @param {Event} _e
   */
  function handleMouseDown(_e) {
    focus = true;
    handle.focus();
  }

  /**
   * When the user focuses the handle of a slider, set it to active
   * @param {Event} _e the event from browser
   */
  function handleFocus(_e) {
    if (!disabled) {
      focus = true;
      dispatch('focus', focus);
    }
  }

  /**
   * When the user has unfocused (blurred) from the slider, deactivate all handles.
   * @param {Event} _e the event from browser
   */
  function handleBlur(_e) {
    focus = false;
    dispatch('focus', focus);
  }

  function handleMouseEnter() {
    hovered = true;
  }

  function handleMouseLeave() {
    hovered = false;
  }

  /**
   * @type {number}
   */
  const initialPosition = calcPercentOfRange(value, { min, max });
  const tween = tweened(initialPosition, { duration: 60, easing: sineOut });

  /**
   * @type {number}
   */
  $: offset = calcPercentOfRange(value, { min, max });
  $: tween.set(offset);
  /**
   * @type {boolean}
   */
  $: canShowActiveTooltip = (active && focus) || hovered;
  /**
   * @type {'vertical' | 'horizontal'}
   */
  $: orientation = vertical ? 'vertical' : 'horizontal';
</script>

<div
  role="slider"
  class={`handle handle-${orientation}`}
  tabindex={disabled ? -1 : tabIndex}
  use:handleStyle={{
    value: $tween,
    active,
    vertical,
  }}
  bind:this={handle}
  on:keydown={handleKeyDown}
  on:mousedown|preventDefault={handleMouseDown}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:focus={handleFocus}
  on:blur={handleBlur}
  class:handle-active={active}
  class:handle-focus={focus}
  class:handle-disabled={disabled}
  aria-valuenow={value}
  aria-orientation={orientation}
  aria-disabled={disabled}
>
  <slot name="tooltips" {canShowActiveTooltip} {value} />
</div>

<style src="./handle.scss">
</style>
