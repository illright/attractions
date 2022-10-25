<script lang="ts">
  /**
   * @slot {{ closeCallback: () => void }}
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

  const dispatch = createEventDispatcher<{ change: { value: boolean } }>();
</script>

{#if !noClickaway}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
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
