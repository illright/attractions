<script>
  import { createEventDispatcher } from 'svelte';
  import Star from './star.svelte';
  import range from '../utils/range.js';
  import classes from '../utils/classes.js';
  import ripple from '../utils/ripple.js';
  import eventsAction from '../utils/events.js';

  let _class = null;
  export { _class as class };
  export let starClass = null;

  export let max = 5;
  export let value = null;
  export let name;
  export let disabled = false;
  export let events = null;

  function reverseArrowKeys(event) {
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

  const dispatch = createEventDispatcher();
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
