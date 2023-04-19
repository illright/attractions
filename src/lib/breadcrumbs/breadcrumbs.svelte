<script lang="ts">
  import Button from '../button/button.svelte';

  /**
   * The list of segments to be displayed.
   */
  export let items: Array<{ href?: string; text: string }> = [];
  /**
   * The separator between segments.
   */
  export let separator = '/';

  // TODO: replace `div` with `ol` and `li`, using `::before` for separator
</script>

<nav class="breadcrumbs">
  {#each items as item, idx}
    {#if idx > 0}
      <slot name="separator">
        <div class="node">{separator}</div>
      </slot>
    {/if}
    <slot name="item" {item}>
      {#if item.href}
        <Button href={item.href} class="node" size="small">{item.text}</Button>
      {:else}
        <span class="node">{item.text}</span>
      {/if}
    </slot>
  {/each}
</nav>

<style lang="scss">
  nav {
    align-items: center;
    display: flex;
    flex: 1;
    font-weight: var(--a-thin-font-weight);
    margin: 0 2em;

    > :global .node {
      margin: 0 0.25em;
    }
  }
</style>
