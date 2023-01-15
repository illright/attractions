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
   * A class string to add to the error message under the text field.
   */
  export let errorClass: string | false | null = null;

  type TextFieldVariant = 'outlined' | 'underlined';
  /**
   *
   */
  export let variant: TextFieldVariant = 'underlined';

  /**
   * The ID to assign to the input.
   */
  export let id: string;
  /**
   * The label to show above the text field.
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

  /**
   * The current value of the text field. Converted to a number if `type="number"`.
   */
  export let value = '';
  /**
   * List of handlers for the [Events](https://illright.github.io/attractions/docs/utilities) action.
   */
  export let events: Array<{ name: string; handler: (e: Event) => void }> = [];

  let focusedByKeyboard = false;
  let precededByKeydownEvent = false;

  let inputElement: HTMLInputElement | HTMLTextAreaElement;
  onMount(() => autofocus && inputElement.focus());

  const dispatch = createEventDispatcher<{
    input: { value: string; nativeEvent: Event };
    change: { value: string; nativeEvent: Event };
    focus: { nativeEvent: FocusEvent };
    keydown: { nativeEvent: KeyboardEvent };
    blur: { nativeEvent: FocusEvent };
  }>();
</script>

<svelte:body
  on:keydown={e => {
    precededByKeydownEvent = e.key === 'Tab';
  }}
/>

<label for={id}>{label}</label>
<label
  role="presentation"
  class={classes('text-field', variant, _class)}
  class:prominent-focus={focusedByKeyboard}
>
  <slot name="before" />

  <svelte:element
    this={multiline ? 'textarea' : 'input'}
    {id}
    on:focus|self={() => {
      if (precededByKeydownEvent) {
        focusedByKeyboard = true;
      }
    }}
    on:blur={() => {
      precededByKeydownEvent = false;
      focusedByKeyboard = false;
    }}
    on:mousedown={() => (precededByKeydownEvent = false)}
  />

  <slot name="after" />
</label>

<!-- <div
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
-->
<style lang="scss">
  .text-field {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border: 0 solid rgba(var(--a-on-surface-rgb), 0.5);
    padding: 0 12px;
    height: 48px;
    gap: 6px;
    transition: border-width 75ms;
    cursor: text;

    &.underlined {
      border-bottom-width: 1px;
      border-top-left-radius: var(--a-text-field-radius);
      border-top-right-radius: var(--a-text-field-radius);
      background: rgba(var(--a-on-surface-rgb), 0.05);

      &:hover {
        background: rgba(var(--a-on-surface-rgb), 0.07);
      }

      &:focus-within {
        background: hsla(var(--a-primary-hsl), 0.05);
        border-bottom-width: 2px;
        border-bottom-color: var(--a-primary);

        &:hover {
          background: hsla(var(--a-primary-hsl), 0.07);
        }
      }
    }

    &.prominent-focus {
      outline: 2px solid var(--a-secondary);
      outline-offset: 2px;
    }

    input {
      border: 0;
      background: none;
      flex: 1;
      outline: 0;
      height: 100%;
    }
  }
</style>
