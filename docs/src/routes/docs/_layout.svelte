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
          title: 'Accordion',
          segment: 'components/accordion',
        },
        {
          title: 'Autocomplete',
          segment: 'components/autocomplete',
        },
        {
          title: 'Button',
          segment: 'components/button',
        },
        {
          title: 'Badge',
          segment: 'components/badge',
        },
        {
          title: 'Card',
          segment: 'components/card',
        },
        {
          title: 'CheckboxGroup',
          segment: 'components/checkbox-group',
        },
        {
          title: 'Chip',
          segment: 'components/chip',
        },
        {
          title: 'DatePicker',
          segment: 'components/date-picker',
        },
        {
          title: 'Dialog',
          segment: 'components/dialog',
        },
        {
          title: 'Divider',
          segment: 'components/divider',
        },
        {
          title: 'Dot',
          segment: 'components/dot',
        },
        {
          title: 'Dropdown',
          segment: 'components/dropdown',
        },
        {
          title: 'FileInput',
          segment: 'components/file-input',
        },
        {
          title: 'FileDropzone',
          segment: 'components/file-dropzone',
        },
        {
          title: 'FormField',
          segment: 'components/form-field',
        },
        {
          title: 'Loading',
          segment: 'components/loading',
        },
        {
          title: 'Modal',
          segment: 'components/modal',
        },
      ],
    },
  ];
</script>

<Header {segment} />
<MobileNavigation {places} segment={segment || ''} />
<main class="padded extra">
  <DesktopNavigation {places} segment={segment || ''} />
  <article>
    <slot />
  </article>
</main>

<style src="../../../static/css/routes/docs/_layout.scss"></style>
