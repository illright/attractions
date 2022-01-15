<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ url }) {
    const relativePathSegment = url.pathname.slice('/docs/'.length);
    return {
      props: {
        segment: relativePathSegment.length === 0 ? null : relativePathSegment,
      },
    };
  }
</script>

<script>
  import { page } from '$app/stores';
  import { Button } from 'attractions';
  import { HomeIcon, ArrowUpIcon } from 'svelte-feather-icons';
  import Header from '$lib/containers/docs/header.svelte';
  import MobileNavigation from '$lib/containers/docs/mobile-navigation.svelte';
  import DesktopNavigation from '$lib/containers/docs/desktop-navigation.svelte';

  export let segment;

  function scrollToTop() {
    window.scrollTo(0, 0);
    // TODO: manage focus
  }

  let scrollbarVisible;
  page.subscribe(function updateScrollbarVisibility() {
    if (typeof window === 'undefined') {
      return;
    }
    scrollbarVisible = window.innerHeight < document.body.scrollHeight;
  });

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
      title: 'Migration Guide',
      segment: 'migration-guide',
    },
    {
      title: 'Installation',
      segment: 'installation',
    },
    {
      title: 'Theming with Sass',
      segment: 'theming',
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
          title: 'Badge',
          segment: 'components/badge',
        },
        {
          title: 'Breadcrumbs',
          segment: 'components/breadcrumbs',
        },
        {
          title: 'Button',
          segment: 'components/button',
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
          title: 'FileDropzone',
          segment: 'components/file-dropzone',
        },
        {
          title: 'FileInput',
          segment: 'components/file-input',
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
        {
          title: 'Pagination',
          segment: 'components/pagination',
        },
        {
          title: 'Popover',
          segment: 'components/popover',
        },
        {
          title: 'RadioGroup',
          segment: 'components/radio-group',
        },
        {
          title: 'Slider',
          segment: 'components/slider',
        },
        {
          title: 'SnackbarContainer',
          segment: 'components/snackbar-container',
        },
        {
          title: 'StarRating',
          segment: 'components/star-rating',
        },
        {
          title: 'Switch',
          segment: 'components/switch',
        },
        {
          title: 'Table',
          segment: 'components/table',
        },
        {
          title: 'Tabs',
          segment: 'components/tabs',
        },
        {
          title: 'TextField',
          segment: 'components/text-field',
        },
        {
          title: 'TimePicker',
          segment: 'components/time-picker',
        },
        {
          title: 'Typography',
          segment: 'components/typography',
        },
      ],
    },
    {
      title: 'Utilities',
      segment: 'utilities',
    },
    {
      title: 'Custom Elements',
      segment: 'custom-elements',
    },
  ];
</script>

<Header {segment} />
<MobileNavigation {places} segment={segment || ''} />
<main class="padded extra">
  <DesktopNavigation {places} segment={segment || ''} />
  <article>
    <slot />
    {#if scrollbarVisible}
      <div class="center">
        <Button filled on:click={scrollToTop}>
          <ArrowUpIcon size="24" class="mr" />
          scroll to top
        </Button>
      </div>
    {/if}
  </article>
</main>

<style lang="scss">
  @use 'attractions-theme' as vars;
  @use 'global';

  main {
    display: flex;
    margin: 1em 0 2em;

    article {
      padding: 1em 0;
      width: 100%;
    }

    :global .required {
      color: vars.$main;
      font-size: 0.9em;
    }

    @media only screen and (min-width: 1024px) {
      flex: 1;
      margin-top: 2em;
    }

    :global small {
      display: block;
      white-space: nowrap;
    }

    :global mark {
      background: none;
      color: vars.$main;

      code {
        color: vars.$main;
      }
    }
  }

  .center {
    display: flex;
    justify-content: center;
    margin-top: 2em;
  }
</style>
