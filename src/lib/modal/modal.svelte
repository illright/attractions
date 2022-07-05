<script lang="ts">
  /**
   * @slot {{ closeCallback: () => void }}
   * @event {{ value: boolean }} change
   */
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * Whether the modal is open or not.
   */
  export let open = false;
  /**
   * Removes the click event listener from the overlay `<div>` to close the modal on an outside click.
   */
  export let noClickaway = false;
  $: dispatch('change', { value: open });

  function close() {
    open = false;
  }

  const dispatch = createEventDispatcher();
</script>

{#if !noClickaway}
  <div
    class:open
    on:click|self={close}
    class={classes('modal-overlay', _class)}
  >
    <slot closeCallback={close} />
  </div>
{:else}
  <div class:open class={classes('modal-overlay', _class)}>
    <slot closeCallback={close} />
  </div>
{/if}

<style src="./modal-overlay.scss">
</style>
