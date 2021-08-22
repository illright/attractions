<script>
  import { calcPercentOfRange } from './utils';
  import { tweened } from 'svelte/motion';
  import { sineOut } from 'svelte/easing';
  import { handleStyle } from './actions';

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
   * @type {number}
   */
  export let index = 0;
  /**
   * @type {number}
   */
  export let activeHandle;
  /**
   * @type {boolean}
   */
  export let disabled;
  /**
   * @type {number}
   */
  export let tabIndex = index;
  /**
   * @type {boolean}
   */
  export let rectangular = false;
  /**
   * @type {'horizontal' | 'vertical'}
   */
  export let orientation = 'horizontal';

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
   * @param {Event} e
   */
  function handleKeyDown(e) {
    focus = false;
  }
  /**
   * focus on mousedown
   * @param {Event} e
   */
  function handleMouseDown(e) {
    handle.focus();
  }

  /**
   * when the user focusses the handle of a slider
   * set it to be active
   * @param {Event} e the event from browser
   **/
  function handleFocus(e) {
    if (!disabled) {
      focus = true;
      activeHandle = index;
    }
  }

  /**
   * when the user has unfocussed (blurred) from the
   * slider, deactivated all handles
   * @param {Event} e the event from browser
   **/
  function handleBlur(e) {
    focus = false;
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
  const tween = tweened(initialPosition, { duration: 120, easing: sineOut });

  /**
   * @type {boolean}
   */
  $: active = activeHandle === index;
  /**
   * @type {number}
   */
  $: offset = calcPercentOfRange(value, { min, max });
  $: tween.set(offset);
  /**
   * @type {boolean}
   */
  $: canShowActiveTooltip = (active && focus) || hovered;
</script>

<div
  role="slider"
  class={`handle handle-${orientation}`}
  tabindex={disabled ? -1 : tabIndex}
  use:handleStyle={{
    value: $tween,
    active,
    vertical: orientation === 'vertical',
  }}
  bind:this={handle}
  on:keydown={handleKeyDown}
  on:mousedown|preventDefault={handleMouseDown}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:focus={handleFocus}
  on:blur={handleBlur}
  data-handle={index}
  class:handle-active={active}
  class:handle-focus={focus}
  class:handle-disabled={disabled}
  class:handle-rectangular={rectangular}
  aria-valuenow={value[index]}
  aria-orientation={orientation}
  aria-disabled={disabled}
>
  <slot name="tooltips" {canShowActiveTooltip} {value} />
</div>

<style src="./handle.scss">
</style>
