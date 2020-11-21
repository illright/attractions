<script>
  import { createEventDispatcher } from 'svelte';

  export let option;
  export let query = null;
  $: matchRegex = (query ? new RegExp(`(${query})`, 'ig') : null);

  function markMatch(string) {
    if (matchRegex == null) {
      return [{ content: string, marked: false }];
    }

    const partition = string.split(matchRegex);
    return partition.map((content, idx) => ({ content, marked: idx % 2 !== 0 }));
  }

  const dispatch = createEventDispatcher();
</script>

<li on:click|stopPropagation={(e) => dispatch('click', { nativeEvent: e })}>
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

<style src="./autocomplete-option.scss"></style>
