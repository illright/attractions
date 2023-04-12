<script lang="ts">
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
</script>

<h1 class={classes(_class)} {...$$restProps}>
  <slot />
</h1>

<style src="./h1.scss">
</style>
