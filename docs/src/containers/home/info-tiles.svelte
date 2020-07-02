<script>
  import * as attractions from 'attractions';
  import { s } from 'attractions/utils';
  import { GridIcon, Edit2Icon, FeatherIcon } from 'svelte-feather-icons';
  import InfoTile from 'src/components/home/info-tile.svelte';

  const totalComponents = [...Object.keys(attractions)].length;
</script>

<div class="info-tiles">
  <InfoTile
    icon={GridIcon}
    title="{totalComponents} component{s(totalComponents)}"
    subtitle="and more to come!"
  />
  <InfoTile
    icon={Edit2Icon}
    title="Stylable with Sass"
    subtitle="customize colors, fonts, shadows!"
  />
  <InfoTile
    icon={FeatherIcon}
    title="How to compute bundle size?"
    subtitle="please help me!"
  />
</div>

<style src="../../../static/css/containers/home/info-tiles.scss"></style>
