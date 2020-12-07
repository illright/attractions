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

<h2 {id}>
  <slot />
  {#if href != null}<a {href} class="ml">#</a>{/if}
</h2>

<style src="../../static/css/mdsvex/h2.scss">
</style>
