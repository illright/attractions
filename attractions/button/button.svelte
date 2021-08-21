<script>
  /**
   * @event {{ nativeEvent: MouseEvent }} click
   * @restProps {a | button}
   */
  import { createEventDispatcher } from 'svelte';
  import ripple from '../utils/ripple.js';
  import eventsAction from '../utils/events.js';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * Adds a filled background to the button.
   * Mutually exclusive with `outline` and `selected`.
   * @type {boolean}
   */
  export let filled = false;
  /**
   * Adds a border to the button.
   * Mutually exclusive with `filled`.
   * @type {boolean}
   */
  export let outline = false;
  /**
   * Gives the button a color of danger (red by default).
   * Mutually exclusive with `neutral`.
   * @type {boolean}
   */
  export let danger = false;
  /**
   * Gives the button a neutral color (very dark gray by default).
   * Mutually exclusive with `danger`.
   * @type {boolean}
   */
  export let neutral = false;
  /**
   * Adjusts the padding to be equal on all sides. Great for icon-only buttons.
   * @type {boolean}
   */
  export let round = false;
  /**
   * Halves the border radius and increases the padding. Well-suited for large menus.
   * @type {boolean}
   */
  export let rectangle = false;
  /**
   * Cuts the padding to make the button smaller.
   * @type {boolean}
   */
  export let small = false;
  /**
   * Gives the button a tinted background. Suitable for indicating the selected item.
   * Mutually exclusive with `filled`.
   * @type {boolean}
   */
  export let selected = false;
  /**
   * Disables the ripple effect.
   * @type {boolean}
   */
  export let noRipple = false;

  /**
   * Disables the button, styling it appropriately and disabling click events.
   * @type {boolean}
   */
  export let disabled = false;
  /**
   * Turns the button into a link (prefetch-enabled for Sapper).
   * @type {string | null}
   */
  export let href = null;
  /**
   * Disables Sapper (or SvelteKit) prefetching for link buttons (those with an href prop).
   * @type {boolean}
   */
  export let noPrefetch = false;

  /**
   * List of handlers for the [Events](https://illright.github.io/attractions/docs/utilities) action.
   * @type {Array<{ name: string; handler: (e: Event) => void }>}
   */
  export let events = [];

  if (filled && outline) {
    console.error('A button may not be filled and outlined at the same time');
  }

  if (danger && neutral) {
    console.error('A button may not be danger and neutral at the same time');
  }

  if (filled && selected) {
    console.error('A button may not be filled and selected at the same time');
  }

  const dispatch = createEventDispatcher();
</script>

{#if href}
  <a
    href={disabled ? null : href}
    rel={noPrefetch ? null : 'prefetch'}
    sapper:prefetch={noPrefetch ? null : true}
    sveltekit:prefetch={noPrefetch ? null : true}
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
