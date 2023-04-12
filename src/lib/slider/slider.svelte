<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Handle from './handle.svelte';
  import {
    getPosition,
    stopEvent,
    ensureValueInRange,
    ensureValuePrecision,
    getClosestHandle,
    calcPercentOfRange,
    getTickValues,
    getSubTickPositions,
    unnestSingle,
  } from './utils';
  import { rangeStyle } from './actions';
  import classes from '../utils/classes.js';
  import type { TickConfig, RangeBehavior, Tooltips } from './types';

  const dispatch = createEventDispatcher<{
    change: number | [number, number];
    focus: void;
    blur: void;
  }>();

  export let min: number;
  export let max: number;
  export let step = 1;
  export let vertical = false;
  export let disabled = false;
  export let value: number | [number, number] =
    max < min ? min : min + (max - min) / 2;
  /**
   * Defines the ticks that appear on the slider track.
   * In `'step'` mode, the value step is used to add a tick at that interval.
   * In `'values'` mode, a list of all the values where ticks should be placed is provided (from min to max).
   * `subDensity` creates sub-ticks with a number that represents a percent interval on a 0-100 scale, e.g. 3 is every 3 percent.
   * In order for sub-ticks to be in sync with with ticks, the tick should be a multiple of the sub-ticks.
   */
  export let ticks: TickConfig = {
    mode: 'none',
  };
  export let rangeBehavior: RangeBehavior = 'block';
  export let tooltips: Tooltips = 'never';

  let _class: string | false | null = null;
  export { _class as class };

  $: internalValue = (typeof value === 'number' ? [value] : value) as
    | [number]
    | [number, number];

  let slider: HTMLDivElement;

  let activeHandle = 0;
  let sliderActive = false;

  $: orientation = vertical ? ('vertical' as const) : ('horizontal' as const);
  $: tickValues = getTickValues(ticks, min, max);
  $: subTicks =
    ticks.mode !== 'none' && ticks.subDensity
      ? getSubTickPositions(ticks, min, max, tickValues)
      : [];

  function onStart(e: MouseEvent | TouchEvent) {
    if (!sliderActive) {
      sliderActive = true;
      const pos = getPosition(vertical, e);
      const nextValue = calcValByPos(pos);
      activeHandle = getClosestHandle(nextValue, internalValue);
      dispatch('focus');
    }
  }

  /**
   * Normalize value.
   */
  function trimAlignValue(v: number) {
    if (v === null) {
      return 0;
    }
    const val = ensureValueInRange(v, { min, max });
    return ensureValuePrecision(val, { min, max, ticks, step });
  }

  /**
   * Get the position of min in the document
   */
  function getSliderStart() {
    const rect = slider.getBoundingClientRect();
    if (vertical) {
      return rect.top;
    }
    return window.pageXOffset + rect.left;
  }

  /**
   * Get the total length of the slider from min to max in the document
   */
  function getSliderLength() {
    if (!slider) {
      return 0;
    }
    const { height, width } = slider.getBoundingClientRect();
    return vertical ? height : width;
  }

  function calcValue(offset: number) {
    const ratio = Math.max(offset, 0) / getSliderLength();
    const value = vertical
      ? (1 - ratio) * (max - min) + min
      : ratio * (max - min) + min;
    return value;
  }

  function calcValByPos(position: number) {
    const pixelOffset = position - getSliderStart();
    return trimAlignValue(calcValue(pixelOffset));
  }

  /**
   * change value based on mouse position, causing handle to move
   */
  function onMove(e: MouseEvent | TouchEvent) {
    if (disabled || !sliderActive) {
      return;
    }
    const pos = getPosition(vertical, e);
    const nextValue = calcValByPos(pos);
    stopEvent(e);
    moveHandle(activeHandle, nextValue);
  }

  function moveHandle(index: number, nextValue: number) {
    if (Array.isArray(value) && nextValue === value[index]) {
      return;
    }
    const next: [number] | [number, number] = [...internalValue];
    next[index] = nextValue;
    let skip = false;
    if (internalValue.length > 1 && rangeBehavior !== 'free') {
      next.forEach((handle, handleIndex) => {
        if (handleIndex === index) {
          return;
        }
        const direction = handle < internalValue[index] ? '<-' : '->';
        const willCrossOver = (handle: number) =>
          direction === '<-' ? handle >= nextValue : handle <= nextValue;
        if (rangeBehavior === 'push' && willCrossOver(handle)) {
          if (direction === '<-') {
            next[handleIndex] = next[index] - 1;
          } else {
            next[handleIndex] = next[index] + 1;
          }
        } else if (rangeBehavior === 'block' && willCrossOver(handle)) {
          skip = true;
        }
      });
    }
    if (!skip) {
      internalValue = next;
      value = unnestSingle(internalValue);
      dispatch('change', value);
    }
  }

  function onEnd(e: MouseEvent | TouchEvent) {
    const el = e.target;
    if (sliderActive) {
      if (el === slider || slider.contains(el as HTMLElement)) {
        onMove(e);
      }
      dispatch('blur');
      sliderActive = false;
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (disabled) {
      return;
    }
    let delta = 0;
    switch (e.key) {
      case 'Up': // IE/Edge specific
      case 'ArrowUp':
      case 'Right': // IE/Edge specific
      case 'ArrowRight':
        delta = step;
        break;
      case 'Down': // IE/Edge specific
      case 'ArrowDown':
      case 'Left': // IE/Edge specific
      case 'ArrowLeft':
        delta = -step;
        break;
      case 'End':
        delta = max - internalValue[activeHandle];
        break;
      case 'Home':
        delta = min - internalValue[activeHandle];
        break;
      case 'PageUp':
        delta = step * 2;
        break;
      case 'PageDown':
        delta = -step * 2;
        break;
    }
    const move = ensureValueInRange(internalValue[activeHandle] + delta, {
      min,
      max,
    });
    moveHandle(activeHandle, move);
    stopEvent(e);
  }

  /**
   * @slot {{ value: number; }} tooltip-content
   * @slot {{ value: number; }} tick-value
   */
</script>

<div
  bind:this={slider}
  class={classes(`slider slider-${orientation}`, _class)}
  on:touchstart={onStart}
  on:mousedown={onStart}
  on:keydown={onKeyDown}
  class:slider-active={sliderActive}
  class:slider-disabled={disabled}
  {...$$restProps}
>
  <div class={`rail rail-${orientation}`} class:rail-disabled={disabled}>
    <slot name="rail-content" />
  </div>
  {#each internalValue as val, index}
    <Handle
      value={val}
      {min}
      {max}
      {vertical}
      {disabled}
      active={activeHandle === index}
      on:focus={() => (activeHandle = index)}
    >
      <div slot="tooltips" let:value let:canShowActiveTooltip>
        {#if tooltips === 'always' || (tooltips === 'active' && canShowActiveTooltip)}
          <div
            class={`handle-tooltip handle-tooltip-${orientation}`}
            class:handle-tooltip-disabled={disabled}
          >
            <div class="handle-tooltip-content">
              <slot name="tooltip-content" {value}>
                {value}
              </slot>
            </div>
          </div>
        {/if}
      </div>
    </Handle>
  {/each}
  <div
    class={`range-selection range-selection-${orientation}`}
    class:range-selection-disabled={disabled}
    use:rangeStyle={{ value: internalValue, vertical, min, max }}
  />
  {#each tickValues as tick}
    <span
      class={`tick tick-${orientation}`}
      class:tick-disabled={disabled}
      style="{vertical ? 'bottom' : 'left'}: {calcPercentOfRange(tick, {
        min,
        max,
      })}%;"
    >
      <span
        class={`tick-value tick-value-${orientation}`}
        class:tick-value-disabled={disabled}
      >
        <slot name="tick-value" value={tick}>
          {tick}
        </slot>
      </span>
    </span>
  {/each}
  {#each subTicks as sub}
    <span
      class={`tick tick-${orientation} tick-${orientation}-sub`}
      class:tick-disabled={disabled}
      style="{vertical ? 'bottom' : 'left'}: {calcPercentOfRange(sub, {
        min,
        max,
      })}%;"
    />
  {/each}
</div>

<svelte:window
  on:mousemove={onMove}
  on:touchmove={onMove}
  on:mouseup={onEnd}
  on:touchend={onEnd}
/>

<style src="./slider.scss">
</style>
