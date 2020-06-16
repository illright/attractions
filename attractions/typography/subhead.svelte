<script>
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };
</script>

<div class={classes('subhead', _class)} {...$$restProps}><slot /></div>

<style src="./subhead.scss"></style>
