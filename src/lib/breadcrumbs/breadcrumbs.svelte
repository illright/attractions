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
        <Button href={item.href} class="node" small>{item.text}</Button>
      {:else}
        <span class="node">{item.text}</span>
      {/if}
    </slot>
  {/each}
</nav>

<style src="./breadcrumbs.scss"></style>
