<script>
  /**
   * @event {{ value: string | number | null; nativeEvent: Event }} input
   * @event {{ value: string | number | null; nativeEvent: Event }} change
   * @event {{ nativeEvent: FocusEvent }} focus
   * @event {{ nativeEvent: KeyboardEvent }} keydown
   * @event {{ nativeEvent: FocusEvent }} blur
   * @restProps {textarea | input}
   */
  import { createEventDispatcher, onMount } from 'svelte';
  import eventsAction from '../utils/events.js';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * A class string to assign to the `<input>` or `<textarea>` element.
   * @type {string | false | null}
   */
  export let inputClass = null;
  /**
   * A class string to assign to the `<label>` for the outline text fields.
   * @type {string | false | null}
   */
  export let labelClass = null;
  /**
   * A class string to add to the error message under the text field.
   * @type {string | false | null}
   */
  export let errorClass = null;

  /**
   * Whether the text field should have outline styling.
   * @type {boolean}
   */
  export let outline = false;
  /**
   * Whether there will be something permanent inside the field like an icon.
   * By default, this item is placed to the left of the input area.
   * @type {boolean}
   */
  export let withItem = false;
  /**
   * Whether the item should be placed to the right of the input area.
   * @type {boolean}
   */
  export let itemRight = false;

  /**
   * The ID to assign to the input.
   * @type {string | null}
   */
  export let id = null;
  /**
   * Whether to hide the spinner (arrow buttons inside `<input type="number">`).
   * @type {boolean}
   */
  export let noSpinner = false;
  /**
   * The label to show above the text field. Only works with `outline` text fields.
   * @type {string | null}
   */
  export let label = null;
  /**
   * The error message to show under the text field.
   * @type {string | false | null}
   */
  export let error = null;
  /**
   * Whether the text field should allow multiple lines (`<textarea>` will be used instead of the `<input>`).
   * @type {boolean}
   */
  export let multiline = false;
  /**
   * Whether the field should be focused on mount.
   * @type {boolean}
   */
  export let autofocus = false;

  if (!outline && label != null) {
    console.error('Labels are only available for outlined text fields');
  }

  /**
   * The current value of the text field. Converted to a number if `type="number"`.
   * @type {string | number | null}
   */
  export let value = null;
  /**
   * List of handlers for the [Events](https://illright.github.io/attractions/docs/utilities) action.
   * @type {Array<{name: string; handler: (e:Event) => void }>}
   */
  export let events = [];

  let inputElement;
  onMount(() => autofocus && inputElement.focus());

  function toNumber(string) {
    if (string === '') {
      return null;
    }
    return parseFloat(string);
  }

  function toString(value) {
    if (value == null) {
      return '';
    }
    return value.toString();
  }

  function handleInput(event) {
    value =
      $$restProps.type === 'number'
        ? toNumber(event.target.value)
        : event.target.value;
    dispatch('input', { value, nativeEvent: event });
  }

  const dispatch = createEventDispatcher();
</script>

<div
  class={classes('text-field', _class)}
  class:outline
  class:with-item={withItem}
  class:left={withItem && !itemRight}
  class:right={withItem && itemRight}
  class:no-spinner={noSpinner}
>
  {#if multiline}
    <textarea
      {id}
      {value}
      class={classes(inputClass)}
      bind:this={inputElement}
      on:input={handleInput}
      on:change={e => dispatch('change', { value, nativeEvent: e })}
      on:focus={e => dispatch('focus', { nativeEvent: e })}
      on:keydown={e => dispatch('keydown', { nativeEvent: e })}
      on:blur={e => dispatch('blur', { nativeEvent: e })}
      use:eventsAction={events}
      {...$$restProps}
    />
  {:else}
    <input
      {id}
      value={toString(value)}
      class={classes(inputClass)}
      bind:this={inputElement}
      on:input={handleInput}
      on:change={e => dispatch('change', { value, nativeEvent: e })}
      on:focus={e => dispatch('focus', { nativeEvent: e })}
      on:keydown={e => dispatch('keydown', { nativeEvent: e })}
      on:blur={e => dispatch('blur', { nativeEvent: e })}
      use:eventsAction={events}
      {...$$restProps}
    />
    {#if outline && label != null}
      <label for={id} class={classes(labelClass)}>{label}</label>
    {/if}

    {#if withItem}
      <slot />
    {/if}

    {#if error}
      <span class={classes('error', errorClass)}>
        <slot name="error">{error}</slot>
      </span>
    {/if}
  {/if}
</div>

<style src="./text-field.scss">
</style>
