<script>
  import { createEventDispatcher } from 'svelte';
  import ripple from '../utils/ripple.js';
  import eventsAction from '../utils/events.js';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let filled = false;
  export let outline = false;
  export let danger = false;
  export let neutral = false;
  export let round = false;
  export let rectangle = false;
  export let small = false;
  export let selected = false;
  export let noRipple = false;

  export let disabled = false;
  export let href = null;
  export let noPrefetch = false;

  export let events = null;

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
    {...$$restProps}>
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
    {...$$restProps}>
    <slot />
  </button>
{/if}

<style src="./button.scss">
</style>
