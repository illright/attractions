<script lang="ts">
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
</script>

<h2 class={classes(_class)} {...$$restProps}>
  <slot />
</h2>

<style lang="scss">
  h2 {
    color: var(--a-primary);
    font-size: 1.3em;
    font-weight: var(--a-bold-font-weight);
    margin: 0 0 0.4em;

    @media only screen and (min-width: 640px) {
      font-size: 1.4em;
    }

    @media only screen and (min-width: 840px) {
      font-size: 1.5em;
    }
  }
</style>
