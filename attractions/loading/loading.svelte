<!-- Adapted from SpinKit by @tobiasahlin: https://tobiasahlin.com/spinkit/ -->
<svelte:options tag="a-loading" />

<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
</script>

<div class={classes('spinner', _class)}>
  <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>
</div>

<style src="./loading.scss"></style>
