<script>
  import { Card, Button, H1 } from 'attractions';
  import { BookOpenIcon, GithubIcon } from 'svelte-feather-icons';
  import InfoTiles from 'src/containers/home/info-tiles.svelte';
</script>

<svelte:head>
  <title>Attractions</title>
  <meta name="og:title" content="Attractions" />
</svelte:head>

<main>
  <Card>
    <header>
      <img src="logo-no-bg.svg" alt="Attractions logo" />
      <H1>Attractions</H1>
      <a href="./docs/changelog" class="hide-on-tb-more" sapper:prefetch>
        v{process.latest_version}
      </a>
    </header>
    <p>
      A <mark>pretty cool</mark> UI kit for
      <a href="https://svelte.dev">Svelte</a>.
    </p>
    <div class="actions">
      <Button filled href="./docs">
        <BookOpenIcon size="24" class="mr" />
        docs
      </Button>
      <Button outline class="ml" href="https://github.com/illright/attractions">
        <GithubIcon size="24" class="mr" />
        GitHub
      </Button>
    </div>
  </Card>
  <div class="strip" />
  <InfoTiles />
  <footer>
    <p>
      made with ❤ by
      <a href="https://github.com/aabounegm">@aabounegm</a>
      and
      <a href="https://github.com/illright">@illright</a>
    </p>
    <p>
      {process.license}
      licensed &nbsp;•&nbsp;
      <a href="./docs/changelog" sapper:prefetch>v{process.latest_version}</a>
    </p>
  </footer>
</main>

<style src="../../static/css/routes/index.scss">
</style>
