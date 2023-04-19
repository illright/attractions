<script lang="ts">
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };

  /**
   * Applies the `$info` color to the dot.
   */
  export let info = false;
  /**
   * Applies the `$attention` color to the dot.
   */
  export let attention = false;
  /**
   * Applies the `$danger` color to the dot.
   */
  export let danger = false;
  /**
   * Applies the `$success` color to the dot.
   */
  export let success = false;

  /**
   * Decreases the size of the dot.
   */
  export let small = false;

  if (+info + +attention + +danger + +success > 1) {
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

<style lang="scss">
  .dot {
    background: var(--a-primary);
    border-radius: 50%;
    height: 0.625em;
    width: 0.625em;

    &.info {
      background: var(--a-info);
    }

    &.attention {
      background: var(--a-attention);
    }

    &.success {
      background: var(--a-success);
    }

    &.danger {
      background: var(--a-danger);
    }

    &.small {
      height: 0.375em;
      width: 0.375em;
    }
  }
</style>
