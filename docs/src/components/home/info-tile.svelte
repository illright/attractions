<script>
  import { goto } from '@sapper/app';
  import { Card } from 'attractions';

  export let icon;
  export let title;
  export let subtitle;
  export let href;
</script>

<div
  class="info-tile"
  role="button"
  on:click={() => goto(href)}
  tabindex="0"
  on:keydown={e => {
    if (e.key == ' ' || e.key == 'Enter') {
      goto(href);
    }
  }}
>
  <Card>
    <div class="icon">
      <svelte:component this={icon} size="24" />
    </div>
    <div class="title">{title}</div>
    <div class="subtitle">{subtitle}</div>
  </Card>
</div>

<style src="../../../static/css/components/home/info-tile.scss">
</style>
