<script>
  import { onMount } from 'svelte';

  export let id = null;

  let href = id && `#${id}`;
  onMount(function createSapperCompatiblePermalink() {
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

<style src="../../static/css/mdsvex/h1.scss">
</style>
