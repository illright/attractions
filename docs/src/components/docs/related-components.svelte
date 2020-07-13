<script>
  import { Label } from 'attractions';

  export let components;
</script>

{#if components.length !== 0}
  <ul class="related-components">
    <Label>Related Components</Label>
    {#each components as component}
      <li>
        <a href={component.link}><code>{component.name}</code></a>
      </li>
    {/each}
  </ul>
{/if}

<style src="../../../static/css/components/docs/related-components.scss"></style>
