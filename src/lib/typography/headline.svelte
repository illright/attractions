<script lang="ts">
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
</script>

<div class={classes('headline', _class)} {...$$restProps}>
  <slot />
</div>

<style lang="scss">
  .headline {
  color: var(--a-primary);
  font-size: 1.5em;
  font-weight: var(--a-bold-font-weight);
  margin-bottom: 0.2em;

  @media only screen and (min-width: 640px) {
    font-size: 1.9em;
  }

  @media only screen and (min-width: 840px) {
    font-size: 2em;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 2.1em;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 2.2em;
  }
}

</style>
