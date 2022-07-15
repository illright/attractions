<script lang="ts">
  /**
   * @restProps {textarea | input}
   */
  import { createEventDispatcher, onMount } from 'svelte';
  import eventsAction from '../utils/events.js';
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * A class string to assign to the `<input>` or `<textarea>` element.
   */
  export let inputClass: string | false | null = null;
  /**
   * A class string to assign to the `<label>` for the outline text fields.
   */
  export let labelClass: string | false | null = null;
  /**
   * A class string to add to the error message under the text field.
   */
  export let errorClass: string | false | null = null;

  /**
   * Whether the text field should have outline styling.
   */
  export let outline = false;
  /**
   * Whether there will be something permanent inside the field like an icon.
   * By default, this item is placed to the left of the input area.
   */
  export let withItem = false;
  /**
   * Whether the item should be placed to the right of the input area.
   */
  export let itemRight = false;

  /**
   * The ID to assign to the input.
   */
  export let id: string | null = null;
  /**
   * Whether to hide the spinner (arrow buttons inside `<input type="number">`).
   */
  export let noSpinner = false;
  /**
   * The label to show above the text field. Only works with `outline` text fields.
   */
  export let label: string | null = null;
  /**
   * The error message to show under the text field.
   */
  export let error: string | false | null = null;
  /**
   * Whether the text field should allow multiple lines (`<textarea>` will be used instead of the `<input>`).
   */
  export let multiline = false;
  /**
   * Whether the field should be focused on mount.
   */
  export let autofocus = false;

  if (!outline && label != null) {
    console.error('Labels are only available for outlined text fields');
  }

  /**
   * The current value of the text field. Converted to a number if `type="number"`.
   */
  export let value: string | number = '';
  /**
   * List of handlers for the [Events](https://illright.github.io/attractions/docs/utilities) action.
   */
  export let events: Array<{ name: string; handler: (e: Event) => void }> = [];

  let inputElement: HTMLInputElement | HTMLTextAreaElement;
  onMount(() => autofocus && inputElement.focus());

  function toNumber(string: string) {
    if (string === '') {
      return NaN;
    }
    return parseFloat(string);
  }

  function toString(value: string | number | null) {
    if (value == null) {
      return '';
    }
    return value.toString();
  }

  function handleInput(
    event: Event & {
      currentTarget: EventTarget & (HTMLInputElement | HTMLTextAreaElement);
    }
  ) {
    value =
      $$restProps.type === 'number'
        ? toNumber(event.currentTarget.value)
        : event.currentTarget.value;
    dispatch('input', { value, nativeEvent: event });
  }

  const dispatch = createEventDispatcher<{
    input: { value: string | number; nativeEvent: Event };
    change: { value: string | number; nativeEvent: Event };
    focus: { nativeEvent: FocusEvent };
    keydown: { nativeEvent: KeyboardEvent };
    blur: { nativeEvent: FocusEvent };
  }>();
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
