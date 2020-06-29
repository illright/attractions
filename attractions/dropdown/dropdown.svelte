<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let right = false;
  export let top = false;
</script>

<div class:right class:top class={classes('dropdown', _class)}>
  <slot />
</div>

<style src="./dropdown.scss"></style>
