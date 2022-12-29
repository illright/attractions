<mark><slot /></mark>

<style lang="scss">
  @use '$css/attractions-theme' as vars;

  mark {
    background: none;
    color: rgb(var(--a-main));

    :global code {
      color: rgb(var(--a-main));
    }
  }
</style>
