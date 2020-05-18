<script>
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };

  let currentlyOpenPanel = null;

  function closeOtherPanels({ detail: thisPanel }) {
    if (currentlyOpenPanel != null && currentlyOpenPanel !== thisPanel) {
      currentlyOpenPanel.close();
    }
    currentlyOpenPanel = thisPanel;
  }
</script>

<ul class={classes('accordion', _class)}>
  <slot {closeOtherPanels} />
</ul>

<style src="./accordion.scss"></style>
