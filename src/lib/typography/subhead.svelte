<script lang="ts">
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
</script>

<div class={classes('subhead', _class)} {...$$restProps}>
  <slot />
</div>

<style lang="scss">
  .subhead {
    font-size: 0.95em;
    font-weight: var(--a-thin-font-weight);
    line-height: 1.2em;

    @media only screen and (min-width: 640px) {
      font-size: 1em;
      line-height: 1.25em;
    }

    @media only screen and (min-width: 840px) {
      font-size: 1.1em;
      line-height: 1.4em;
    }

    @media only screen and (min-width: 1024px) {
      font-size: 1.2em;
      line-height: 1.6em;
    }
  }
</style>
