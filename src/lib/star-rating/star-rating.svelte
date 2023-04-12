<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Star from './star.svelte';
  import range from '../utils/range.js';
  import classes from '../utils/classes.js';
  import ripple from '../utils/ripple.js';
  import eventsAction from '../utils/events.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * A class string to assign to the `<label>` element containing the star icon.
   */
  export let starClass: string | false | null = null;

  /**
   * How many stars to be displayed.
   */
  export let max = 5;
  /**
   * Current amount of selected stars.
   */
  export let value = 0;
  /**
   * The name to assign to all stars belonging to the same group. Check [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname) for more information.
   */
  export let name: string;
  /**
   * Disables star selection.
   */
  export let disabled = false;
  /**
   * List of handlers for the [Events](https://illright.github.io/attractions/docs/utilities) action
   */
  export let events: Array<{ name: string; handler: (e: Event) => void }> = [];

  function reverseArrowKeys(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        value = (value + (max + 1) - 1) % (max + 1);
        if (value === 0) {
          value = max; // would otherwise get stuck at 1
        }
        break;

      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        value = (value + 1) % (max + 1);
        break;
    }
    value = Math.max(value, 1);
  }

  const dispatch = createEventDispatcher<{
    change: { value: number; nativeEvent: Event };
  }>();
</script>

<div role="group" class={classes('star-rating', _class)}>
  {#each [...range(max, 0, -1)] as i}
    <input
      bind:group={value}
      value={i}
      type="radio"
      {name}
      id={`${name}-${i}`}
      {disabled}
      on:change={e => dispatch('change', { value, nativeEvent: e })}
      on:keydown={reverseArrowKeys}
      use:eventsAction={events}
      {...$$restProps}
    />
    <label
      class={classes(starClass)}
      for={`${name}-${i}`}
      use:ripple={{ disabled }}
    >
      <slot name="icon">
        <Star />
      </slot>
    </label>
  {/each}
</div>

<style src="./star-rating.scss">
</style>
