<script lang="ts">
  import { base } from '$app/paths';
  import { Button, Breadcrumbs } from '$lib';
  import { GithubIcon, HomeIcon } from 'svelte-feather-icons';

  function capitalize(word: string) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }
  function segmentToName(segment: string) {
    if (segment === '') {
      return '';
    }
    return segment.split('-').map(capitalize).join(' ');
  }

  export let segment: string;

  const logoSize = 30;
</script>

<header class="padded">
  <a href="{base}/" class="logo">
    <img
      src="{base}/logo-no-bg.svg"
      width={logoSize}
      height={logoSize}
      alt="Logo"
    />
    <span class="hide-on-less-tb">Attractions</span>
  </a>
  {#if segment != null}
    <Breadcrumbs items={[{ href: '/docs' }, { text: segmentToName(segment) }]}>
      <div slot="item" let:item>
        {#if item.href === '/docs'}
          <Button href="{base}/docs" round small>
            <HomeIcon size="20" />
          </Button>
        {:else}
          <div class="node">{item.text}</div>
        {/if}
      </div>
    </Breadcrumbs>
  {/if}
  <div class="clickables">
    <!-- TODO: add the versions here
    <DropdownShell let:toggle>
      <Button small on:click={toggle}>
        v{process.latest_version}
        <ChevronDownIcon size="20" class="dropdown-chevron ml" />
      </Button>
      <Dropdown>

      </Dropdown>
    </DropdownShell> -->
    <Button round href="https://github.com/illright/attractions">
      <GithubIcon size="24" />
    </Button>
  </div>
</header>

<style lang="scss">
  @use 'sass:color';
  @use '$css/attractions-theme' as vars;

  $side-margin: 1em;

  header {
    align-items: center;
    border-bottom: 1px solid color.adjust(vars.$main, $alpha: -0.75);
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5em;
    padding-top: 0.6em;

    .logo,
    .clickables {
      align-items: center;
      display: flex;
    }

    .logo {
      margin-left: $side-margin + 0.7em;
      text-decoration: none;

      span {
        color: #000;
        font-size: 1.25em;
        font-weight: vars.$bold-font-weight;
        margin-left: 0.7em;
      }
    }

    .clickables {
      margin-right: $side-margin;

      :global .dropdown-chevron {
        margin-top: -2px;
      }
    }
  }
</style>
