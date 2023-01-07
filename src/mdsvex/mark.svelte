<mark><slot /></mark>

<style lang="scss">
  @use '$css/attractions-theme' as vars;

  mark {
    background: none;
    color: var(--a-primary);

    :global code {
      color: var(--a-primary);
    }
  }
</style>
