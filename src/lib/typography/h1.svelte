<script lang="ts">
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
</script>

<h1 class={classes(_class)} {...$$restProps}>
  <slot />
</h1>

<style lang="scss">
  h1 {
    color: var(--a-primary);
    font-size: 1.4em;
    font-weight: var(--a-bold-font-weight);
    margin: 0 0 0.5em;

    @media only screen and (min-width: 640px) {
      font-size: 1.55em;
    }

    @media only screen and (min-width: 840px) {
      font-size: 1.7em;
    }

    @media only screen and (min-width: 1024px) {
      font-size: 1.8em;
    }
  }
</style>
