<script>
  import Header from 'src/containers/docs/header.svelte';
  import MobileNavigation from 'src/containers/docs/mobile-navigation.svelte';
  import DesktopNavigation from 'src/containers/docs/desktop-navigation.svelte';
  import { HomeIcon } from 'svelte-feather-icons';

  const places = [
    {
      title: HomeIcon,
      href: './docs',
    },
    {
      title: 'Changelog',
      href: './docs/changelog',
    },
    {
      title: 'Installation',
      href: './docs/installation',
    },
    {
      title: 'Components',
      sub: [
        {
          title: 'Placeholder',
          href: './docs/placeholder',
        },
        {
          title: 'Second placeholder',
          href: './docs/placeholder2',
        },
      ],
    },
  ];
</script>

<Header />
<MobileNavigation {places} />
<main class="padded extra">
  <DesktopNavigation {places} />
  <slot />
</main>

<style src="../../../static/css/routes/docs/_layout.scss"></style>
