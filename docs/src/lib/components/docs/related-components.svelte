<script>
  import { Label, Card, Button } from 'attractions';
  import { classes } from 'attractions/utils';

  let _class = null;
  export { _class as class };
  export let components;
</script>

{#if components.length !== 0}
  <div class={classes('related-components', _class)}>
    <Label>Related Components</Label>
    {#each components as component}
      <Card>
        <Button href={component.link}>{component.name}</Button>
      </Card>
    {/each}
  </div>
{/if}

<style lang="scss">
  @use 'sass:color';
  @use 'attractions-theme' as vars;

  .related-components {
    background: color.adjust(vars.$main, $alpha: -0.97);
    border-radius: 1em;
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.5em;
    padding: 1em 1em 1em 2em;

    :global {
      .label {
        margin-bottom: 0.75em;
        width: 100%;
      }

      .card {
        margin: 0 0.5em 0.5em 0;
        padding: 0.5em;
      }
    }
  }
</style>
