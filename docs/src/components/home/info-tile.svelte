<script>
  import { Card } from 'attractions';

  export let icon;
  export let title;
  export let subtitle;
</script>

<div class="info-tile">
  <Card>
    <div class="icon">
      <svelte:component this={icon} size="24" />
    </div>
    <div class="title">{title}</div>
    <div class="subtitle">{subtitle}</div>
  </Card>
</div>

<style src="../../../static/css/components/home/info-tile.scss"></style>
