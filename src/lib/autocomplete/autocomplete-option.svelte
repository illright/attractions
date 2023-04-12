<script lang="ts" context="module">
  export interface Option {
    name: string;
    details?: string;
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import escapeRegExp from '../utils/escape-regexp.js';

  /**
   * The option data to render.
   */
  export let option: Option;
  /**
   * The substring to seek out and highlight among the name and the details.
   */
  export let query: string | null = null;
  $: matchRegex = query ? new RegExp(`(${escapeRegExp(query)})`, 'ig') : null;

  function markMatch(string: string) {
    if (matchRegex == null) {
      return [{ content: string, marked: false }];
    }

    const partition = string.split(matchRegex);
    return partition.map((content, idx) => ({
      content,
      marked: idx % 2 !== 0,
    }));
  }

  const dispatch = createEventDispatcher<{
    click: { nativeEvent: MouseEvent };
  }>();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li on:click|stopPropagation={e => dispatch('click', { nativeEvent: e })}>
  <button type="button">
    {#each markMatch(option.name) as part}
      {#if part.marked}<mark>{part.content}</mark>{:else}{part.content}{/if}
    {/each}
    {#if option.details}
      <div class="subtext">
        {#each markMatch(option.details) as part}
          {#if part.marked}<mark>{part.content}</mark>{:else}{part.content}{/if}
        {/each}
      </div>
    {/if}
  </button>
</li>

<style src="./autocomplete-option.scss">
</style>
