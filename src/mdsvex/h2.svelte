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

<h2 {id}>
  <slot />
  {#if href != null}<a {href} class="ml">#</a>{/if}
</h2>

<style lang="scss">
  @use '$css/attractions-theme' as vars;

  h2 {
    font-size: 1.3em;
    font-weight: vars.$bold-font-weight;
    margin: 2em 0 1em;

    @media only screen and (min-width: 640px) {
      font-size: 1.4em;
    }

    @media only screen and (min-width: 840px) {
      font-size: 1.5em;
    }
  }
</style>
