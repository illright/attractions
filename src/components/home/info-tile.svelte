<script lang="ts">
  import { goto } from '$app/navigation';
  import { Card } from '$lib';
  import type { SvelteComponentTyped } from 'svelte';

  export let icon: typeof SvelteComponentTyped<{ size?: string }>;
  export let title: string;
  export let subtitle: string;
  export let href: string;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="info-tile" on:click={() => goto(href)}>
  <Card>
    <div class="icon">
      <svelte:component this={icon} size="24" />
    </div>
    <div class="title">{title}</div>
    <div class="subtitle">{subtitle}</div>
  </Card>
</div>

<style lang="scss">
  @use '$css/attractions-theme' as vars;

  .info-tile {
    cursor: pointer;
    margin-bottom: 1em;

    :global .card {
      column-gap: 1em;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto;
      transition: 150ms box-shadow;

      &:hover {
        box-shadow: vars.$shadow-raised;
      }
    }

    .icon {
      align-self: center;
      background: vars.$main;
      border-radius: 50%;
      color: #fff;
      grid-row: span 2;
      padding: 0.8em;

      :global svg {
        display: block;
      }
    }

    .subtitle {
      color: vars.$main;
      font-size: 0.9em;
      font-weight: vars.$thin-font-weight;
    }

    @media only screen and (min-width: 640px) {
      margin-bottom: 2.5em;

      :global .card {
        width: 30em;
      }
    }

    @media only screen and (min-width: 1024px) {
      margin-bottom: 1em;
    }
  }
</style>
