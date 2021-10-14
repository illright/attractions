<script>
  import { Card, Button, H1 } from 'attractions';
  import { BookOpenIcon, GithubIcon } from 'svelte-feather-icons';
  import InfoTiles from '$lib/containers/home/info-tiles.svelte';
  import { latestVersion, license } from '$lib/environment.js';
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
      <a href="./docs/changelog" class="hide-on-tb-more" sveltekit:prefetch>
        v{latestVersion}
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
      <Button
        outline
        noPrefetch
        class="ml"
        href="https://github.com/illright/attractions"
      >
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
      {license}
      licensed &nbsp;•&nbsp;
      <a href="./docs/changelog" sveltekit:prefetch>v{latestVersion}</a>
    </p>
  </footer>
</main>

<style lang="scss">
  @use 'sass:color';
  @use 'attractions-theme' as vars;
  @use 'global';

  $mobile-top-padding: 2.4em;

  main {
    background: color.adjust(vars.$main, $alpha: -0.93);
    padding: $mobile-top-padding 0.5em;

    mark {
      background: none;
      color: vars.$main;
    }

    > :global .card {
      align-items: center;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 20;

      header {
        align-items: center;
        display: flex;
        margin-top: 1em;

        img {
          margin-right: 1em;
          width: 2em;
        }

        h1 {
          color: #000;
          margin-bottom: 0;
        }

        a {
          margin-left: 1em;
        }
      }

      p {
        font-weight: vars.$thin-font-weight;
        margin-top: 1.5em;
      }

      .actions {
        display: flex;
      }
    }

    .strip {
      background: vars.$main;
      height: 3.6em;
      left: 0;
      position: absolute;
      top: $mobile-top-padding + 7.9em;
      width: 100%;
      z-index: 10;
    }

    footer {
      margin-top: 2em;
      padding-bottom: 1em;

      p {
        font-size: 0.95em;
        font-weight: 300;
        margin: 0.7em 0 0;
        text-align: center;
      }
    }

    @media only screen and (min-width: 360px) {
      align-items: center;
      display: flex;
      flex-direction: column;

      > :global .card {
        padding: 1.5em 2em;
      }
    }

    @media only screen and (min-width: 640px) {
      > :global .card {
        padding: 2em 3.5em;
      }

      .strip {
        height: 8em;
      }
    }

    @media only screen and (min-width: 1024px) {
      column-gap: 4em;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: 1fr auto 1fr;
      min-height: 100vh;
      padding: 0 5%;

      :global {
        > .card,
        .info-tiles {
          grid-row: 2;
        }

        .card {
          width: max-content;
        }
      }

      footer {
        align-self: end;
        grid-column: span 2;
        grid-row: 3;
        padding-bottom: 2em;
      }

      .strip {
        height: 100%;
        left: calc(5% - 1em);
        top: 0;
        width: 11em;
      }
    }

    @media only screen and (min-width: 1200px) {
      padding: 0 15%;

      .strip {
        left: calc(15% - 1em);
      }
    }
  }
</style>
