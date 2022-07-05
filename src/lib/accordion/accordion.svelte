<script lang="ts">
  import classes from '../utils/classes.js';
  import type { AccordionSectionControl } from './accordion-section-control';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * Setting this to true allows multiple panels to be open at the same time.
   */
  export let multiple = false;

  let currentlyOpenPanel: AccordionSectionControl | null = null;

  function closeOtherPanels({
    detail: thisPanel,
  }: CustomEvent<AccordionSectionControl>) {
    if (
      currentlyOpenPanel != null &&
      currentlyOpenPanel !== thisPanel &&
      !multiple
    ) {
      currentlyOpenPanel.close();
    }
    currentlyOpenPanel = thisPanel;
  }
</script>

<ul class={classes('accordion', _class)} {...$$restProps}>
  <slot {closeOtherPanels} />
</ul>

<style src="./accordion.scss">
</style>
