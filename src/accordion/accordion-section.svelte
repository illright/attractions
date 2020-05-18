<script>
  import Button from '../button/button.svelte';
  import { createEventDispatcher } from 'svelte';
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };

  export let label = null;
  export let open = false;

  const selfControl = {
    close() {
      open = false;
    },
    toggle() {
      if (!open) {
        dispatch('panel-open', selfControl);
      }
      open = !open;
    },
  };

  const dispatch = createEventDispatcher();
</script>


<li class:open class={classes('panel', _class)}>
  <slot name="handle" toggle={selfControl.toggle}>
    <Button on:click={selfControl.toggle}>{label}</Button>
  </slot>
</li>
<section>
  <slot />
</section>

<style src="./accordion-section.scss"></style>
