<script>
  import ripple from '../_utils/ripple.js';
  import eventsAction from '../_utils/events.js';
  import classes from '../_utils/classes.js';

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

  export let disabled = false;
  export let href = null;

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

  if (href != null && disabled) {
    console.warn('The prop `disabled` has no effect on Buttons with href');
  }
</script>

{#if href}
  <a
    {href}
    {disabled}
    rel="prefetch"
    class={classes('btn', _class)}
    class:filled
    class:outline
    class:danger
    class:round
    class:neutral
    class:rectangle
    class:small
    class:selected
    on:click
    use:eventsAction={events}
    use:ripple
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
    on:click
    use:ripple
    use:eventsAction={events}
    {...$$restProps}
  >
    <slot />
  </button>
{/if}

<style src="./button.scss"></style>
