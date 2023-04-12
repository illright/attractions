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

<h3 {id}>
  <slot />
  {#if href != null}<a {href} class="ml">#</a>{/if}
</h3>

<style lang="scss">
  @use '$css/attractions-theme' as vars;

  h3 {
    font-size: 1.1em;
    font-weight: vars.$bold-font-weight;
    margin: 1.5em 0 0.5em;

    @media only screen and (min-width: 640px) {
      font-size: 1.2em;
    }

    @media only screen and (min-width: 840px) {
      font-size: 1.3em;
    }
  }
</style>
