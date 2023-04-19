<script lang="ts">
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * Removes the internal padding for full control over the content.
   */
  export let tight = false;
  /**
   * Instead of emphasizing the card with a shadow, uses an outline.
   */
  export let outline = false;
</script>

<div
  class:outline
  class={classes('card', _class, tight && 'no-padding')}
  {...$$restProps}
>
  <slot />
</div>

<style lang="scss">
  .card {
    background-color: var(--a-background);
    border-radius: var(--a-card-radius);
    box-shadow: var(--a-shadow-0);
    overflow: hidden;
    padding: 1.5em;

    &.no-padding {
      padding: 0;
    }

    &.outline {
      border: 1px solid hsla(var(--a-primary-hsl), 0.3);
      box-shadow: none;
    }
  }
</style>
