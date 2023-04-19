<script lang="ts">
  /**
   * Adds a text to the middle of the line.
   */
  export let text: string | null = null;
</script>

<hr data-text={text} {...$$restProps} />

<style lang="scss">
  hr {
    border: 0 solid var(--a-light-contrast);
    border-top-width: 1px;
    margin-top: 1em;
    width: 100%;

    &[data-text] {
      overflow: visible;
      position: relative;

      &::after {
        background: var(--a-background);
        content: attr(data-text);
        font-size: 0.85rem;
        left: 50%;
        padding: 0 0.4em;
        position: absolute;
        top: 0;
        transform: translate(-50%, -55%);
      }
    }
  }
</style>
