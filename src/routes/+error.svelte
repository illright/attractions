<script lang="ts">
  import { page } from '$app/stores';
  import { dev } from '$app/environment';

  $: status = $page.status;
  $: error = $page.error as Error;
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
