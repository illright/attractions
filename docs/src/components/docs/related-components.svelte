<script>
  import { Label, Card, Button } from 'attractions';
  import { classes } from 'attractions/utils';

  let _class = null;
  /** @type {string | false | null} */
  export { _class as class };
  /** @type {Array<{ link: string; name: string; }>} */
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

<style src="../../../static/css/components/docs/related-components.scss">
</style>
