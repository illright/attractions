<script>
  /**
   * @typedef {{ close: () => void; toggle: () => void }} AccordionSectionControl
   * @slot {{ closeOtherPanels: (e: CustomEvent<AccordionSectionControl>) => void }}
   */
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * Setting this to true allows multiple panels to be open at the same time.
   * @type {boolean}
   */
  export let multiple = false;

  /**
   * @type {AccordionSectionControl | null}
   */
  let currentlyOpenPanel = null;

  function closeOtherPanels({ detail: thisPanel }) {
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
