<script>
  import { Button, Breadcrumbs } from 'attractions';
  import { GithubIcon, HomeIcon } from 'svelte-feather-icons';
  import segmentToName from 'src/utils/segment-to-name.js';

  export let segment;

  const logoSize = 30;
</script>

<header class="padded">
  <a href="./" class="logo">
    <img src="logo-no-bg.svg" width={logoSize} height={logoSize} alt="Logo" />
    <span class="hide-on-less-tb">Attractions</span>
  </a>
  {#if segment != null}
    <Breadcrumbs items={[{ href: '/docs' }, { text: segmentToName(segment) }]}>
      <div slot="item" let:item>
        {#if item.href === '/docs'}
          <Button href="/docs" round small>
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
        v{latestVersion}
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

<style src="../../../static/css/containers/docs/header.scss">
</style>
