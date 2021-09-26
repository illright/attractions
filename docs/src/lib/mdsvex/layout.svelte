<script context="module">
  import Heading1 from './h1.svelte';
  import Heading2 from './h2.svelte';
  import Heading3 from './h3.svelte';
  import UnorderedList from './ul.svelte';
  import ListItem from './li.svelte';
  import Table from './table.svelte';
  import TableHead from './th.svelte';
  import TableRow from './tr.svelte';
  import TableData from './td.svelte';
  import Mark from './mark.svelte';
  import Paragraph from './p.svelte';

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
  export let name;
</script>

<svelte:head>
  <title>{name} – Attractions</title>
  <meta name="og:title" content="{name} – Attractions" />
</svelte:head>

<slot />
