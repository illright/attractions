<script lang="ts">
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
</script>

<h3 class={classes(_class)} {...$$restProps}>
  <slot />
</h3>

<style lang="scss">
  h3 {
    font-size: 1.15em;
    font-weight: var(--a-bold-font-weight);
    margin: 0 0 0.3em;

    @media only screen and (min-width: 640px) {
      font-size: 1.25em;
    }

    @media only screen and (min-width: 840px) {
      font-size: 1.35em;
    }
  }
</style>
