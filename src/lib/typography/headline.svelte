<script lang="ts">
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
</script>

<div class={classes('headline', _class)} {...$$restProps}>
  <slot />
</div>

<style src="./headline.scss">
</style>
