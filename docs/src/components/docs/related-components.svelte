<script>
  import { Label, Card, Button } from 'attractions';

  export let components;
</script>

{#if components.length !== 0}
  <div class="related-components">
    <Label>Related Components</Label>
    {#each components as component}
      <Card>
        <Button href={component.link}>{component.name}</Button>
      </Card>
    {/each}
  </div>
{/if}

<style src="../../../static/css/components/docs/related-components.scss"></style>
