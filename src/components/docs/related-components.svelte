<script lang="ts">
  import { base } from '$app/paths';
  import { Label, Card, Button } from '$lib';
  import { classes } from '$lib/utils';

  let _class: string | false | null = null;
  export { _class as class };
  export let components: Array<{ link: string; name: string }>;
</script>

{#if components.length !== 0}
  <div class={classes('related-components', _class)}>
    <Label>Related Components</Label>
    {#each components as component}
      <Card>
        <Button href={component.link.replace('./', `${base}/`)}
          >{component.name}</Button
        >
      </Card>
    {/each}
  </div>
{/if}

<style lang="scss">
  @use 'sass:color';
  @use '$css/attractions-theme' as vars;

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
