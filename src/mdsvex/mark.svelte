<mark><slot /></mark>

<style lang="scss">
  @use '$css/attractions-theme' as vars;

  mark {
    background: none;
    color: hsl(var(--a-main));

    :global code {
      color: hsl(var(--a-main));
    }
  }
</style>
