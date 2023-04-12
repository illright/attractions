<script context="module">
  import Heading1 from '$mdsvex/h1.svelte';
  import Heading2 from '$mdsvex/h2.svelte';
  import Heading3 from '$mdsvex/h3.svelte';
  import UnorderedList from '$mdsvex/ul.svelte';
  import ListItem from '$mdsvex/li.svelte';
  import Table from '$mdsvex/table.svelte';
  import TableHead from '$mdsvex/th.svelte';
  import TableRow from '$mdsvex/tr.svelte';
  import TableData from '$mdsvex/td.svelte';
  import Mark from '$mdsvex/mark.svelte';
  import Paragraph from '$mdsvex/p.svelte';

  export {
    Heading1 as h1,
    Heading2 as h2,
    Heading3 as h3,
    UnorderedList as ul,
    ListItem as li,
    Table as table,
    TableHead as th,
    TableRow as tr,
    TableData as td,
    Mark as mark,
    Paragraph as p,
  };
</script>

<script>
  // For some reason, MDsveX cannot work with layouts written in TS
  /** @type {string} */
  export let name;
</script>

<svelte:head>
  <title>{name} – Attractions</title>
  <meta name="og:title" content="{name} – Attractions" />
</svelte:head>

<slot />
