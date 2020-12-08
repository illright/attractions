<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };

  export let info = false;
  export let attention = false;
  export let danger = false;
  export let success = false;

  export let small = false;

  if (info + attention + danger + success > 1) {
    console.warn(
      'A dot can either be info, attention, danger or success, not several of them'
    );
  }
</script>

<div
  class={classes('dot', _class)}
  class:info
  class:attention
  class:success
  class:danger
  class:small
  {...$$restProps}
/>

<style src="./dot.scss">
</style>
