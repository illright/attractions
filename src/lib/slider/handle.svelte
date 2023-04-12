<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { sineOut } from 'svelte/easing';
  import { handleStyle } from './actions';
  import { calcPercentOfRange } from './utils';

  const dispatch = createEventDispatcher<{ focus: boolean }>();

  export let value: number;
  export let min: number;
  export let max: number;
  export let active: boolean;
  export let disabled = false;
  export let tabIndex = 0;
  export let vertical = false;

  let focus = false;
  let hovered = false;
  let handle: HTMLDivElement;
  /**
   * focus on keydown
   */
  function handleKeyDown(_e: Event) {
    focus = false;
  }
  /**
   * focus on mousedown
   */
  function handleMouseDown(_e: Event) {
    focus = true;
    handle.focus();
  }

  /**
   * When the user focuses the handle of a slider, set it to active
   */
  function handleFocus(_e: Event) {
    if (!disabled) {
      focus = true;
      dispatch('focus', focus);
    }
  }

  /**
   * When the user has unfocused (blurred) from the slider, deactivate all handles.
   */
  function handleBlur(_e: Event) {
    focus = false;
    dispatch('focus', focus);
  }

  function handleMouseEnter() {
    hovered = true;
  }

  function handleMouseLeave() {
    hovered = false;
  }

  const initialPosition = calcPercentOfRange(value, { min, max });
  const tween = tweened(initialPosition, { duration: 60, easing: sineOut });

  $: offset = calcPercentOfRange(value, { min, max });
  $: tween.set(offset);
  $: canShowActiveTooltip = (active && focus) || hovered;
  $: orientation = vertical ? ('vertical' as const) : ('horizontal' as const);
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
