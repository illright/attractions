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

<style lang="scss">
  .label {
    color: var(--a-primary);
    font-size: 0.8em;
    font-weight: var(--a-bold-font-weight);
    text-transform: uppercase;

    &.small {
      font-size: 0.7em;
    }
  }
</style>
