<script lang="ts">
  /**
   * @restProps {a | button}
   */
  import { createEventDispatcher } from 'svelte';
  import ripple from '../utils/ripple.js';
  import eventsAction from '../utils/events.js';
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };

  type ButtonVariant = 'flat' | 'outlined' | 'filled';
  type ButtonColor = 'primary' | 'danger' | 'neutral';
  type ButtonSize = 'small' | 'medium' | 'large';
  type ButtonShape = 'rectangle' | 'square';

  /**
   * The level of prominence for a button (from least to most):
   * - flat
   * - outlined
   * - filled
   */
  export let variant: ButtonVariant = 'flat';

  /**
   *
   */
  export let color: ButtonColor = 'primary';
  /**
   * Cuts the padding to make the button smaller.
   */
  export let size: ButtonSize = 'medium';

  export let shape: ButtonShape = 'rectangle';

  /**
   * Disables the button, styling it appropriately and disabling click events.
   */
  export let disabled: boolean | 'focusable' = false;
  /**
   * Turns the button into a link (prefetch-enabled for SvelteKit).
   */
  export let href: string | null = null;

  /**
   * List of handlers for the [Events](https://illright.github.io/attractions/docs/utilities) action.
   */
  export let events: Array<{ name: string; handler: (e: Event) => void }> = [];

  const dispatch = createEventDispatcher<{
    click: { nativeEvent: MouseEvent };
  }>();

  function handleClick(e: MouseEvent) {
    if (disabled !== 'focusable') {
      dispatch('click', { nativeEvent: e });
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element
  this={href ? 'a' : 'button'}
  {href}
  on:click={handleClick}
  disabled={disabled === true}
  aria-disabled={disabled === 'focusable' ? 'true' : undefined}
  use:eventsAction={events}
  use:ripple={{
    disabled: Boolean(disabled),
  }}
  class={classes('button', variant, color, size, shape, _class)}
  {...$$restProps}
>
  <slot />
</svelte:element>

<style lang="scss">
  .button {
    border: 0;
    background: none;
    cursor: pointer;
    display: inline-flex;
    gap: 5px;
    font-family: var(--a-font-family);
    border-radius: var(--a-button-radius);
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: var(--a-button-font-weight);
    text-decoration: none;

    &.large {
      padding: 0.75rem 1rem;

      &.square {
        padding: 0.75rem;
      }
    }

    &.medium {
      padding: 0.5rem 1rem;

      &.square {
        padding: 0.5rem;
      }
    }

    &.small {
      padding: calc(6 / 16 / 0.9 * 1em) 0.75rem;
      font-size: 0.9rem;
      line-height: 1.25rem;

      &.square {
        padding: calc(6 / 16 / 0.9 * 1em);
      }
    }

    &:focus-visible {
      outline: 2px solid var(--a-secondary);
      outline-offset: 2px;
    }

    &[disabled],
    &[aria-disabled='true'] {
      cursor: not-allowed;
    }

    &.filled {
      color: var(--a-on-primary);
      background: linear-gradient(
          to bottom,
          rgba(var(--a-on-primary-rgb), 0.03),
          rgba(var(--a-on-primary-rgb), 0)
        ),
        var(--a-primary);
      box-shadow: var(--a-elevation-2);

      &:hover {
        background: linear-gradient(
            rgba(var(--a-on-primary-rgb), 0.05),
            rgba(var(--a-on-primary-rgb), 0.05)
          ),
          linear-gradient(
            to bottom,
            rgba(var(--a-on-primary-rgb), 0.03),
            rgba(var(--a-on-primary-rgb), 0)
          ),
          var(--a-primary);
      }

      & :global(.ripple) {
        background: rgba(var(--a-on-primary-rgb), 0.08);
      }

      &[disabled],
      &[aria-disabled='true'] {
        box-shadow: var(--a-elevation-1);
        background: linear-gradient(
            to bottom,
            rgba(var(--a-on-primary-rgb), 0.03),
            rgba(var(--a-on-primary-rgb), 0)
          ),
          var(--a-neutral-50);
      }
    }

    &.flat,
    &.outlined {
      color: var(--a-primary);

      & :global(.ripple) {
        background: hsla(var(--a-primary-hsl), 0.08);
      }

      &[disabled],
      &[aria-disabled='true'] {
        background: none;
        color: var(--a-neutral-50);

        &:hover {
          background: none;
        }
      }
    }

    &.flat {
      &:hover {
        background: hsla(var(--a-primary-hsl), 0.05);
      }
    }

    &.outlined {
      box-shadow: inset 0 0 0 1px var(--a-primary);
      background: hsla(var(--a-primary-hsl), 0.05);
      transition: box-shadow 75ms;

      &:hover {
        background: hsla(var(--a-primary-hsl), 0.08);
      }

      &:active {
        box-shadow: inset 0 0 0 2px var(--a-primary);
      }

      &[disabled],
      &[aria-disabled='true'] {
        box-shadow: inset 0 0 0 1px var(--a-neutral-50);
      }
    }

    &.danger {
      &.filled {
        background: linear-gradient(
            to bottom,
            rgba(var(--a-on-primary-rgb), 0.03),
            rgba(var(--a-on-primary-rgb), 0)
          ),
          var(--a-danger);
      }

      &.flat,
      &.outlined {
        color: var(--a-danger);

        & :global(.ripple) {
          background: hsla(var(--a-danger-hsl), 0.08);
        }
      }

      &.flat {
        &:hover {
          background: hsla(var(--a-danger-hsl), 0.05);
        }
      }

      &.outlined {
        box-shadow: inset 0 0 0 1px var(--a-danger);
        background: hsla(var(--a-danger-hsl), 0.05);

        &:hover {
          background: hsla(var(--a-danger-hsl), 0.08);
        }

        &:active {
          box-shadow: inset 0 0 0 2px var(--a-danger);
        }
      }
    }

    &.neutral {
      &.filled {
        background: linear-gradient(
            to bottom,
            rgba(var(--a-on-primary-rgb), 0.03),
            rgba(var(--a-on-primary-rgb), 0)
          ),
          var(--a-neutral-100);
      }

      &.flat,
      &.outlined {
        color: var(--a-neutral-100);

        & :global(.ripple) {
          background: hsla(var(--a-neutral-100-hsl), 0.08);
        }
      }

      &.flat {
        &:hover {
          background: hsla(var(--a-neutral-100-hsl), 0.05);
        }
      }

      &.outlined {
        box-shadow: inset 0 0 0 1px var(--a-neutral-100);
        background: hsla(var(--a-neutral-100-hsl), 0.05);

        &:hover {
          background: hsla(var(--a-neutral-100-hsl), 0.08);
        }

        &:active {
          box-shadow: inset 0 0 0 2px var(--a-neutral-100);
        }
      }
    }
  }
</style>
