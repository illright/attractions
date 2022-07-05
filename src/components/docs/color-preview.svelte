<script lang="ts">
  export let value: string;
  export let bordered = false;
</script>

<div class="preview">
  <div class="color" class:bordered style="background: {value};" />
  {value}
</div>

<style lang="scss">
  @use '$css/attractions-theme' as vars;

  .preview {
    align-items: center;
    display: flex;
    font-family: 'Roboto Mono', monospace;

    .color {
      border: 1px solid transparent;
      border-radius: 50%;
      flex-shrink: 0;
      height: 1.5em;
      margin-right: 0.8em;
      width: 1.5em;

      &.bordered {
        border-color: vars.$main;
      }
    }
  }
</style>
