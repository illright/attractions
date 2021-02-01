<script>
  /**
   * @slot {{ toggle: () => void }} handle
   * @event {{ close: () => void; toggle: () => void }} panel-open
   * @event {{ close: () => void; toggle: () => void }} panel-close
   */
  import Button from '../button/button.svelte';
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };

  /**
   * The label text to use on the button that toggles the section.
   * Not used if the handle slot is provided.
   * @type {string | null}
   */
  export let label = null;
  /**
   * The state of the section: opened or closed.
   * @type {boolean}
   */
  export let open = false;

  const selfControl = {
    close() {
      open = false;
    },
    toggle() {
      dispatch(!open ? 'panel-open' : 'panel-close', selfControl);
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

<style src="./accordion-section.scss">
</style>
