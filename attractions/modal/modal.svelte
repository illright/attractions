<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let open = false;
  $: dispatch('change', { value: open });

  function close() {
    open = false;
  }

  const dispatch = createEventDispatcher();
</script>

<div
  class:open
  on:click|self={close}
  class={classes('modal-overlay', _class)}
>
  <slot closeCallback={close} />
</div>

<style src="./modal-overlay.scss"></style>
