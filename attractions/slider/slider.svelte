<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { createEventDispatcher } from 'svelte';
  import Handle from './handle.svelte';
  import {
    getPosition,
    stopEvent,
    ensureValueInRange,
    ensureValuePrecision,
    keyCode,
    validateProps,
    getClosestHandle,
    calcPercentOfRange,
    getTickValues,
    getSubTickPositions,
    unnestSingle,
  } from './utils';
  import { rangeStyle } from './actions';
  import classes from '../utils/classes.js';

  /**
   * @typedef {import('./types').SliderState} State
   */

  /**
   * @event {State} change
   * @event {State} start
   * @event {State} stop
   */
  const dispatch = createEventDispatcher();

  /**
   * @type {number}
   */
  export let min;
  /**
   * @type {number}
   */
  export let max;
  /**
   * @type {number}
   */
  export let step = 1;
  /**
   * @type {boolean}
   */
  export let vertical = false;
  /**
   * @type {boolean}
   */
  export let disabled = false;
  /**
   * @type {number | [number, number]}
   */
  export let value;
  /**
   * in 'step' mode, a value step which is used to add a tick at that interval from min to max
   * in 'values' mode, a list of all the values where ticks should be placed is provided from min to max
   * subDensity creates sub-ticks with a number that represents a percent interval on a 0-100 scale, e.g. 3 is every 3 percent
   * in order for sub-ticks to be in sync with with ticks the tick should be a multiple of the sub-ticks
   * @type {import('./types').TickConfig}
   */
  export let ticks = {
    mode: 'none',
  };
  /**
   * @type {import('./types').RangeBehavior}
   */
  export let rangeBehavior = 'block';
  /**
   * @type {import('./types').Tooltips}
   */
  export let tooltips = 'never';
  /**
   * @type {boolean}
   */
  export let rectangularHandle = false;

  /**
   * @type {string | null}
   */
  let _class = null;
  export { _class as class };

  $: value = typeof value === 'number' ? [value] : value.slice(0, 2);

  /**
   * @type {HTMLDivElement}
   */
  let slider;

  /**
   * putting key deps in writable store allows injecting them
   * without adding reactive labels to all the functions with these deps
   * and dealing with circular dependencies
   * @type {import('svelte/store').Writable<State>}
   */
  const state = writable({
    min,
    max,
    value: toValue(value),
    activeHandle: value[0] === max ? 0 : value.length - 1,
    sliderActive: false,
  });

  // ensure state can be updated via props
  $: $state.value = toValue(value);
  $: $state.min = min;
  $: $state.max = max;

  onMount(() => {
    validateProps($$props);
    const unsubscribe = state.subscribe(s => {
      const changedState = { ...s, value: unnestSingle(s.value) };
      dispatch('change', changedState);
    });
    return () => unsubscribe();
  });

  /**
   * @type {'vertical' | 'horizontal'}
   */
  $: orientation = vertical ? 'vertical' : 'horizontal';
  /**
   * @type {number[]}
   */
  $: tickValues = getTickValues(ticks, min, max);
  /**
   * @type {number[]}
   */
  $: subTicks = ticks.subDensity
    ? getSubTickPositions(ticks, min, max, tickValues)
    : [];

  /**
   * @param {number | number[]}
   * @return {number[]}
   */
  function toValue(v) {
    return typeof v === 'number' ? [v] : v.slice(0, 2);
  }
  /**
   * @param {Event} e
   */
  function onStart(e) {
    if (!$state.sliderActive) {
      $state.sliderActive = true;
      const pos = getPosition(vertical, e);
      const nextValue = calcValByPos(pos);
      $state.activeHandle = getClosestHandle(nextValue, $state.value);
      dispatch('start', $state);
    }
  }

  /**
   * normalize value
   * @param {number} v
   */
  function trimAlignValue(v) {
    if (v === null) {
      return null;
    }
    const val = ensureValueInRange(v, $state);
    return ensureValuePrecision(val, { ...$state, ticks, step });
  }
  /**
   * get the position of min in dom
   * @return {number}
   */
  function getSliderStart() {
    const rect = slider.getBoundingClientRect();
    if (vertical) {
      return rect.top;
    }
    return window.pageXOffset + rect.left;
  }

  /**
   * get length of slider from min to max in dom
   * @return {number}
   */
  function getSliderLength() {
    if (!slider) {
      return 0;
    }
    const { height, width } = slider.getBoundingClientRect();
    return vertical ? height : width;
  }

  /**
   * @param {number}
   * @return {number}
   */
  function calcValue(offset) {
    const { min, max } = $state;
    const ratio = Math.abs(Math.max(offset, 0) / getSliderLength());
    const value = vertical
      ? (1 - ratio) * (max - min) + min
      : ratio * (max - min) + min;
    return value;
  }

  /**
   * @param {number}
   * @return {number}
   */
  function calcValByPos(position) {
    const pixelOffset = position - getSliderStart();
    return trimAlignValue(calcValue(pixelOffset));
  }

  /**
   * change value based on mouse position, causing handle to move
   * @param {Event} e
   */
  function onMove(e) {
    if (disabled || !$state.sliderActive) {
      return;
    }
    const pos = getPosition(vertical, e);
    const nextValue = calcValByPos(pos);
    stopEvent(e);
    moveHandle($state.activeHandle, nextValue);
  }

  /**
   * @param {number} index
   * @param {number} nextValue
   */
  function moveHandle(index, nextValue) {
    const { value } = $state;
    if (nextValue === value[index]) {
      return;
    }
    const next = [...value];
    next[index] = nextValue;
    let skip = false;
    if (value.length > 1 && rangeBehavior !== 'free') {
      next.forEach((handle, handleIndex) => {
        if (handleIndex === index) {
          return;
        }
        const direction = handle < value[index] ? '<-' : '->';
        const willCrossOver =
          direction === '<-'
            ? handle => handle >= nextValue
            : handle => handle <= nextValue;
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
      $state.value = next;
    }
  }

  /**
   * @param {Event}
   */
  function onEnd(e) {
    const el = e.target;
    if ($state.sliderActive) {
      if (el === slider || slider.contains(el)) {
        onMove(e);
      }
      dispatch('stop', $state);
      $state.sliderActive = false;
    }
  }

  /**
   * @param {Event}
   */
  function onKeyDown(e) {
    if (disabled) {
      return;
    }
    let move = undefined;
    switch (e.keyCode) {
      case keyCode.UP:
      case keyCode.RIGHT:
        move = $state.value[$state.activeHandle] += step;
        break;
      case keyCode.DOWN:
      case keyCode.LEFT:
        move = $state.value[$state.activeHandle] -= step;
        break;
      case keyCode.END:
        move = max;
        break;
      case keyCode.HOME:
        move = min;
        break;
      case keyCode.PAGE_UP:
        move = $state.value[$state.activeHandle] += step * 2;
        break;
      case keyCode.PAGE_DOWN:
        move = $state.value[$state.activeHandle] -= step * 2;
        break;
    }
    if (move !== undefined) {
      moveHandle($state.activeHandle, move);
    }
    stopEvent(e);
  }

  /**
   * @slot {{ value: number; }} tooltip-content
   */
</script>

<div
  bind:this={slider}
  class={classes(`slider slider-${orientation}`, _class)}
  on:ontouchstart={onStart}
  on:mousedown={onStart}
  on:keydown={onKeyDown}
  class:slider-active={$state.sliderActive}
  class:slider-disabled={disabled}
  {...$$restProps}
>
  <div class={`rail rail-${orientation}`} class:rail-disabled={disabled}>
    <slot name="rail-content" />
  </div>
  {#each $state.value as val, index}
    <Handle
      {index}
      value={val}
      min={$state.min}
      max={$state.max}
      {vertical}
      {disabled}
      active={$state.activeHandle === index}
      rectangular={rectangularHandle}
      on:focus={() => ($state.activeHandle = index)}
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
    use:rangeStyle={{ ...$state, vertical }}
  />
  {#each tickValues as tick}
    <span
      class={`tick tick-${orientation}`}
      class:tick-disabled={disabled}
      style="{vertical ? 'bottom' : 'left'}: {calcPercentOfRange(
        tick,
        $state
      )}%;"
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
      style="{orientation === 'vertical'
        ? 'bottom'
        : 'left'}: {calcPercentOfRange(sub, $state)}%;"
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
