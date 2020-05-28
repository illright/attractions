<script>
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };
  export let open = false;

  function close() {
    open = false;
  }
</script>

<div
  class:open
  on:click|self={close}
  class={classes('modal-overlay', _class)}
>
  <slot closeCallback={close} />
</div>

<style src="./modal-overlay.scss"></style>
