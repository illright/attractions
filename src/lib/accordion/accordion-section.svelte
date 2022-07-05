<script lang="ts">
  import Button from '../button/button.svelte';
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';
  import type { AccordionSectionControl } from './accordion-section-control';

  let _class: string | false | null = null;
  export { _class as class };

  /**
   * The label text to use on the button that toggles the section.
   * Not used if the handle slot is provided.
   */
  export let label: string | null = null;
  /**
   * The state of the section: opened or closed.
   */
  export let open = false;

  const selfControl: AccordionSectionControl = {
    close() {
      open = false;
    },
    toggle() {
      dispatch(!open ? 'panel-open' : 'panel-close', selfControl);
      open = !open;
    },
  };

  const dispatch = createEventDispatcher<{
    'panel-open': AccordionSectionControl;
    'panel-close': AccordionSectionControl;
  }>();
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
