<script lang="ts">
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * Makes the `<Label>` smaller.
   */
  export let small = false;
</script>

<div class={classes('label', _class)} class:small {...$$restProps}>
  <slot />
</div>

<style src="./label.scss">
</style>
