<script>
  /**
   * @slot {{ toggle: () => void }}
   * @event {{ value: boolean }} change
   */
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * Controls whether the dropdown content is shown or hidden.
   * @type {boolean}
   */
  export let open = false;

  /**
   * A callback to toggle the open state of the dropdown.
   * @type {() => void}
   * @readonly
   */
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
