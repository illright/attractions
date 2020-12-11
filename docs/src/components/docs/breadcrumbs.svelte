<script>
  import { Button } from 'attractions';
  import { HomeIcon } from 'svelte-feather-icons';
  import segmentToName from 'src/utils/segment-to-name.js';

  export let segment;
</script>

<nav class="breadcrumbs">
  {#if segment != null}
    <Button href="./docs" round small>
      <HomeIcon size="20" />
    </Button>
    <div class="node">/</div>
    <div class="node">{segmentToName(segment)}</div>
  {/if}
</nav>

<style src="../../../static/css/components/docs/breadcrumbs.scss">
</style>
