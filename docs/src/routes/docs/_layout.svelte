<script>
  import Header from 'src/containers/docs/header.svelte';
  import MobileNavigation from 'src/containers/docs/mobile-navigation.svelte';
  import DesktopNavigation from 'src/containers/docs/desktop-navigation.svelte';
  import { HomeIcon } from 'svelte-feather-icons';

  export let segment;

  const places = [
    {
      title: HomeIcon,
      segment: '',
    },
    {
      title: 'Changelog',
      segment: 'changelog',
    },
    {
      title: 'Installation',
      segment: 'installation',
    },
    {
      title: 'Components',
      sub: [
        {
          title: 'Button',
          segment: 'components/button',
        },
        {
          title: 'Second placeholder',
          segment: 'placeholder2',
        },
      ],
    },
  ];
</script>

<Header {segment} />
<MobileNavigation {places} segment={segment || ''} />
<main class="padded extra">
  <DesktopNavigation {places} segment={segment || ''} />
  <slot />
</main>

<style src="../../../static/css/routes/docs/_layout.scss"></style>
