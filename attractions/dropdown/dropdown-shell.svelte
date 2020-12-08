<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let open = false;

  export function toggle() {
    open = !open;
  }

  $: dispatch('change', { value: open });

  let self = null;
  function clickOutside(event) {
    if (!self) {
      return;
    }

    const isClickInside = self.contains(event.target);
    if (!isClickInside && open) {
      toggle();
    }
  }

  function handleKeyPress(evt) {
    if (evt.key === 'Escape' && open) {
      evt.preventDefault();
      toggle();
    }
  }

  $: typeof document !== 'undefined' &&
    (open
      ? document.addEventListener('keydown', handleKeyPress)
      : document.removeEventListener('keydown', handleKeyPress));

  const dispatch = createEventDispatcher();
</script>

<svelte:window on:click={clickOutside} />

<div bind:this={self} class:open class={classes('dropdown-shell', _class)}>
  <slot {toggle} />
</div>

<style src="./dropdown-shell.scss">
</style>
