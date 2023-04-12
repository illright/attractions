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
  /**
   * Adds a filled background to the button.
   * Mutually exclusive with `outline` and `selected`.
   */
  export let filled = false;
  /**
   * Adds a border to the button.
   * Mutually exclusive with `filled`.
   */
  export let outline = false;
  /**
   * Gives the button a color of danger (red by default).
   * Mutually exclusive with `neutral`.
   */
  export let danger = false;
  /**
   * Gives the button a neutral color (very dark gray by default).
   * Mutually exclusive with `danger`.
   */
  export let neutral = false;
  /**
   * Adjusts the padding to be equal on all sides. Great for icon-only buttons.
   */
  export let round = false;
  /**
   * Halves the border radius and increases the padding. Well-suited for large menus.
   */
  export let rectangle = false;
  /**
   * Cuts the padding to make the button smaller.
   */
  export let small = false;
  /**
   * Gives the button a tinted background. Suitable for indicating the selected item.
   * Mutually exclusive with `filled`.
   */
  export let selected = false;
  /**
   * Disables the ripple effect.
   */
  export let noRipple = false;

  /**
   * Disables the button, styling it appropriately and disabling click events.
   */
  export let disabled = false;
  /**
   * Turns the button into a link (prefetch-enabled for SvelteKit).
   */
  export let href: string | null = null;

  /**
   * List of handlers for the [Events](https://illright.github.io/attractions/docs/utilities) action.
   */
  export let events: Array<{ name: string; handler: (e: Event) => void }> = [];

  if (filled && outline) {
    console.error('A button may not be filled and outlined at the same time');
  }

  if (danger && neutral) {
    console.error('A button may not be danger and neutral at the same time');
  }

  if (filled && selected) {
    console.error('A button may not be filled and selected at the same time');
  }

  const dispatch = createEventDispatcher<{
    click: { nativeEvent: MouseEvent };
  }>();
</script>

{#if href}
  <a
    href={disabled ? null : href}
    disabled={disabled ? true : null}
    class={classes('btn', _class)}
    class:filled
    class:outline
    class:danger
    class:round
    class:neutral
    class:rectangle
    class:small
    class:selected
    on:click={e => dispatch('click', { nativeEvent: e })}
    use:eventsAction={events}
    use:ripple={{ disabled: noRipple || disabled }}
    {...$$restProps}
  >
    <slot />
  </a>
{:else}
  <button
    type="button"
    {disabled}
    class={classes('btn', _class)}
    class:filled
    class:outline
    class:danger
    class:round
    class:neutral
    class:rectangle
    class:small
    class:selected
    on:click={e => dispatch('click', { nativeEvent: e })}
    use:ripple={{ disabled: noRipple || disabled }}
    use:eventsAction={events}
    {...$$restProps}
  >
    <slot />
  </button>
{/if}

<style src="./button.scss">
</style>
