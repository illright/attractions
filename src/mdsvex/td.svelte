<td>
  <slot />
</td>

<style lang="scss">
  @use 'sass:color';
  @use '$css/attractions-theme' as vars;

  td {
    border: 0 solid hsla(var(--a-primary-hsl), 0.25);
    border-width: 1px 0 0 1px;
    line-height: 1.3em;
    padding: 1em;

    &:last-child {
      border-right-width: 1px;
    }
  }
</style>
