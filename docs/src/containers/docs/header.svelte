<script>
  import { Button } from 'attractions';
  import { GithubIcon } from 'svelte-feather-icons';

  const logoSize = 30;
</script>

<header class="padded">
  <a href="/" class="logo">
    <img src="logo-no-bg.svg" width={logoSize} height={logoSize} alt="Logo" />
    <span class="hide-on-less-tb">Attractions</span>
  </a>
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

<style src="../../../static/css/containers/docs/header.scss"></style>
