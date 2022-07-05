<script>
  import { onMount } from 'svelte';
  import * as attractions from '$lib';
  import { s, formatFileSize } from '$lib/utils';
  import { GridIcon, Edit2Icon, FeatherIcon } from 'svelte-feather-icons';
  import InfoTile from '$components/home/info-tile.svelte';

  const totalComponents =
    Object.keys(attractions).length -
    1 - // utils
    1; // importer
  let bundleSizePromise = Promise.resolve(Infinity);

  onMount(() => {
    bundleSizePromise = fetch(
      `https://bundlephobia.com/api/size?package=attractions@${process.latest_version}`
    ).then(response => response.json());
  });
</script>

<div class="info-tiles">
  <InfoTile
    icon={GridIcon}
    title="{totalComponents} component{s(totalComponents)}"
    subtitle="and more to come!"
    href="./docs/components/button"
  />
  <InfoTile
    icon={Edit2Icon}
    title="Stylable with Sass"
    subtitle="customize colors, fonts, shadows!"
    href="./docs/installation"
  />
  {#await bundleSizePromise}
    <InfoTile
      icon={FeatherIcon}
      title="Calculating bundle size"
      subtitle="gimme a sec..."
      href="https://bundlephobia.com/result?p=attractions"
    />
  {:then bundleSize}
    <InfoTile
      icon={FeatherIcon}
      title="{formatFileSize(bundleSize['size'])} in size"
      subtitle="and only {formatFileSize(bundleSize['gzip'])} gzipped!"
      href="https://bundlephobia.com/result?p=attractions"
    />
  {:catch}
    <InfoTile
      icon={FeatherIcon}
      title="Well, that's embarrasing"
      subtitle="an error occurred while fetching the bundle size."
      href="https://bundlephobia.com/result?p=attractions"
    />
  {/await}
</div>

<style lang="scss">
  .info-tiles {
    margin-top: 3em;

    @media only screen and (min-width: 640px) {
      margin-top: 6em;
    }

    @media only screen and (min-width: 1024px) {
      margin-top: 0;
    }
  }
</style>
