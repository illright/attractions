<script lang="ts">
  import classes from '../utils/classes.js';
  import PopoverPositions from './popover-positions.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * A class string to add to the popover.
   */
  export let popoverClass: string | false | null = null;

  /**
   * The position of the popover content relative to the triggering handle.
   */
  export let position: PopoverPositions = PopoverPositions.TOP;
</script>

<div class={classes('popover-container', _class)}>
  <slot />
  <div class={classes('popover', position, popoverClass)}>
    <slot name="popover-content" />
  </div>
</div>

<style lang="scss">
  .popover-container {
    position: relative;

    > .popover {
      display: none;
      position: absolute;

      &.top {
        left: 50%;
        top: 0;
        transform: translate(-50%, -100%);
      }

      &.bottom {
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 100%);
      }

      &.left {
        bottom: 50%;
        left: 0;
        transform: translate(-100%, 50%);
      }

      &.right {
        bottom: 50%;
        right: 0;
        transform: translate(100%, 50%);
      }
    }

    &:hover > .popover {
      display: block;
    }

    &:focus-within > .popover {
      display: block;
    }
  }
</style>
