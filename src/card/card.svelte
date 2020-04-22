<script>
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };
  export let tight = false;
</script>

<div class={classes('card', _class, tight && 'no-padding')} {...$$restProps}>
  <slot />
</div>

<style src="./card.scss"></style>
