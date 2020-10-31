<svelte:options tag="a-modal" />

<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let open = false;
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

<style src="./modal-overlay.scss"></style>
