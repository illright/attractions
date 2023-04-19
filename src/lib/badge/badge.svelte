<script lang="ts">
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * Whether the badge is shown or hidden. Useful for controlling its appearance without modifying the DOM tree.
   */
  export let hidden = false;
</script>

<div class={classes('badge', _class)} class:hidden {...$$restProps}>
  <slot />
</div>

<style lang="scss">
  .badge {
    position: relative;

    &::after {
      background-color: var(--a-badge-default);
      border-radius: 50%;
      box-shadow: var(--a-shadow-raised);
      content: '';
      height: 0.625em;
      position: absolute;
      right: -0.125em;
      top: -0.1875em;
      width: 0.625em;
    }

    &.hidden::after {
      display: none;
    }

    :global .icon {
      display: block;
    }
  }
</style>
