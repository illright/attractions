<mark><slot /></mark>

<style lang="scss">
  @use 'attractions-theme' as vars;

  mark {
    background: none;
    color: vars.$main;

    :global code {
      color: vars.$main;
    }
  }
</style>
