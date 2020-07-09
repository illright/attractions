<script context="module">
  import { H1, H2, H3 } from 'attractions';
  import UL from 'src/components/docs/ul.svelte';
  import LI from 'src/components/docs/li.svelte';

  export {
    H1 as h1,
    H2 as h2,
    H3 as h3,
    UL as ul,
    LI as li,
  };
</script>

<article>
  <slot />
</article>
