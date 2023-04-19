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
  export let id: string | null = null;
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
   * Disables the text field, styling it appropriately and disabling click events.
   */
  export let disabled: boolean | 'focusable' = false;

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
    input: { value: string; nativeEvent: InputEvent };
    change: { value: string; nativeEvent: Event };
    focus: { nativeEvent: FocusEvent };
    keydown: { nativeEvent: KeyboardEvent };
    blur: { nativeEvent: FocusEvent };
  }>();

  function handleKeyDown(e: KeyboardEvent) {
    if (disabled === 'focusable' && e.key !== 'Tab') {
      e.preventDefault();
    }

    dispatch('keydown', { nativeEvent: e });
  }

  function handleInput(
    e: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    value = e.currentTarget?.value ?? value;
    dispatch('input', { value, nativeEvent: e as unknown as InputEvent });
  }
</script>

<svelte:body
  on:keydown={e => {
    precededByKeydownEvent = e.key === 'Tab';
  }}
/>

<div class="text-field-wrapper">
  {#if label != null}
    <label for={id}>{label}</label>
  {/if}
  <label
    role="presentation"
    class={classes(
      'text-field',
      variant,
      disabled && 'disabled',
      error && 'error',
      _class
    )}
    class:prominent-focus={focusedByKeyboard}
  >
    <slot name="before" />

    <svelte:element
      this={multiline ? 'textarea' : 'input'}
      disabled={disabled === true || undefined}
      aria-disabled={disabled === 'focusable' ? 'true' : undefined}
      {value}
      on:input={handleInput}
      on:keydown={handleKeyDown}
      {id}
      aria-errormessage={id && id + '-error'}
      class={inputClass}
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
      {...$$restProps}
    />

    <slot name="after" />
  </label>
  {#if error !== null}
    <span class={classes('error-message', errorClass)} id={id && id + '-error'}>
      {error || ''}
    </span>
  {/if}
</div>

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
    cursor: text;
    position: relative;
    color: rgba(var(--a-on-surface-rgb), 0.5);

    input {
      font-size: 1rem;
      line-height: 1.5;

      &::placeholder {
        color: rgba(var(--a-on-surface-rgb), 0.5);
      }
    }

    &::before {
      content: '';
      position: absolute;
      box-sizing: border-box;
      width: calc(100% + 1px * 2);
      height: calc(100% + 1px * 2);
      bottom: -1px;
      left: -1px;
      border: 0 solid var(--a-primary);
      transition: border 75ms;

      @media (prefers-reduced-motion) {
        transition: none;
      }
    }

    &.underlined {
      border-bottom-width: 1px;
      border-top-left-radius: var(--a-text-field-radius);
      border-top-right-radius: var(--a-text-field-radius);
      background: rgba(var(--a-on-surface-rgb), 0.05);

      &:hover:not(.disabled) {
        background: rgba(var(--a-on-surface-rgb), 0.07);
      }

      &::before {
        left: 0;
        width: 100%;
      }

      &:focus-within:not(.disabled) {
        background: hsla(var(--a-primary-hsl), 0.05);
        color: var(--a-primary);

        &::before {
          border-bottom-width: 2px;
        }

        &:hover {
          background: hsla(var(--a-primary-hsl), 0.07);
        }
      }
    }

    &.outlined {
      border-width: 1px;
      border-radius: var(--a-text-field-radius);

      &:hover:not(.disabled) {
        background: rgba(var(--a-on-surface-rgb), 0.05);
      }

      &::before {
        border-radius: var(--a-text-field-radius);
      }

      &:focus-within:not(.disabled) {
        background: hsla(var(--a-primary-hsl), 0.05);
        color: var(--a-primary);

        &::before {
          border-width: 2px;
        }

        &:hover {
          background: hsla(var(--a-primary-hsl), 0.07);
        }
      }
    }

    &.disabled {
      caret-color: transparent;
      cursor: not-allowed;
      border-color: rgba(var(--a-on-surface-rgb), 0.07);

      input {
        cursor: inherit;
        appearance: textfield;
        color: var(--a-on-surface);

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          appearance: none;
          margin: 0;
        }
      }

      &.underlined {
        background: transparent;
      }
    }

    &.prominent-focus {
      &::after {
        --additional-border-offset: 1px;
        --outline-offset: 2px;
        --outline-width: 2px;

        content: '';
        position: absolute;
        top: calc(-1 * (var(--outline-width) + var(--outline-offset)));
        left: calc(-1 * (var(--outline-width) + var(--outline-offset)));
        width: calc(100% + var(--outline-offset) * 2);
        height: calc(
          100% + var(--outline-offset) * 2 + var(--additional-border-offset)
        );
        border: var(--outline-width) solid var(--a-secondary);
        border-radius: calc(
          var(--a-text-field-radius) + var(--outline-offset) + 1px
        );
      }

      &.underlined {
        &::after {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }

      &.outlined {
        &::after {
          top: calc(
            -1 * (var(--outline-width) + var(--outline-offset) +
                  var(--additional-border-offset))
          );
          left: calc(
            -1 * (var(--outline-width) + var(--outline-offset) +
                  var(--additional-border-offset))
          );
          width: calc(
            100% + var(--outline-offset) * 2 + var(--additional-border-offset) *
              2
          );
          height: calc(
            100% + var(--outline-offset) * 2 + var(--additional-border-offset) *
              2
          );
        }
      }
    }

    input {
      border: 0;
      background: none;
      flex: 1;
      outline: 0;
      height: 100%;
    }

    &.error {
      color: var(--a-danger);

      &::before {
        border-color: var(--a-danger);
      }

      &:focus-within:not(.disabled) {
        background: hsla(var(--a-danger-hsl), 0.05);
        color: var(--a-danger);

        &:hover {
          background: hsla(var(--a-danger-hsl), 0.07);
        }
      }
    }
  }

  .text-field-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .error-message {
    color: var(--a-danger);
    font-size: 90%;
    display: inline-block;
    height: 18px;
  }
</style>
