<script lang="ts">
  /**
   * Adds a text to the middle of the line.
   */
  export let text: string | null = null;
</script>

<hr data-text={text} {...$$restProps} />

<style src="./divider.scss">
</style>
