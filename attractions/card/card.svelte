<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let tight = false;
  export let outline = false;
</script>

<div class:outline class={classes('card', _class, tight && 'no-padding')} {...$$restProps}>
  <slot />
</div>

<style src="./card.scss"></style>
