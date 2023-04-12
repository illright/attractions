<script lang="ts">
  import { onMount } from 'svelte';

  export let id: string | null = null;

  let href = id && `#${id}`;
  onMount(function createSvelteKitCompatiblePermalink() {
    if (id == null) {
      return;
    }

    href = window.location.origin + window.location.pathname + href;
  });
</script>

<h1 {id}>
  <slot />
  {#if href != null}<a {href} class="ml">#</a>{/if}
</h1>

<style lang="scss">
  @use '$css/attractions-theme' as vars;

  h1 {
    color: vars.$main;
    font-size: 1.4em;
    font-weight: vars.$bold-font-weight;
    margin: 0 0 0.5em;

    @media only screen and (min-width: 640px) {
      font-size: 1.55em;
    }

    @media only screen and (min-width: 840px) {
      font-size: 1.7em;
    }

    @media only screen and (min-width: 1024px) {
      font-size: 1.8em;
    }
  }
</style>
