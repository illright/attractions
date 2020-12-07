<!-- Adapted from SpinKit by @tobiasahlin: https://tobiasahlin.com/spinkit/ -->
<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
</script>

<div class={classes('spinner', _class)}>
  <div class="bounce1" />
  <div class="bounce2" />
  <div class="bounce3" />
</div>

<style src="./loading.scss">
</style>
