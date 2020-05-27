<script>
  import { createEventDispatcher } from 'svelte';
  import Star from './star.svelte';
  import range from '../_utils/range.js';
  import classes from '../_utils/classes.js';
  import ripple from '../_utils/ripple.js';
  import eventsAction from '../_utils/events.js';

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
      event.preventDefault();
      value = (value + (max + 1) - 1) % (max + 1);
      break;

    case 'ArrowRight':
      event.preventDefault();
      value = (value + 1) % (max + 1);
      break;

    }
  }

  const dispatch = createEventDispatcher();
</script>

<div role="group" class={classes('star-rating', _class)}>
  {#each [...range(max, 0, -1)] as i}
    <input
      bind:group={value}
      value={i}
      type="radio"
      name={name}
      id={`${name}-${i}`}
      {disabled}
      on:change={(e) => dispatch('change', { value, nativeEvent: e })}
      on:keydown={reverseArrowKeys}
      use:eventsAction={events}
      {...$$restProps}
    />
    <label class={starClass} for={`${name}-${i}`} use:ripple={{ disabled }}>
      <slot name="icon"><Star /></slot>
    </label>
  {/each}
</div>

<style src="./star-rating.scss"></style>
