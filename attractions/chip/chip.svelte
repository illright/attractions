<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let small = false;
  export let outline = false;
  export let noPadding = false;
</script>

<div
  class:small
  class:outline
  class:no-padding={noPadding}
  class={classes('chip', _class)}
>
  <slot />
</div>

<style src="./chip.scss">
</style>
