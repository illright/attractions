<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let multiple = false;

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
