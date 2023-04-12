<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from '$lib';
  import {
    CopyIcon,
    CheckIcon,
    FileTextIcon,
    TerminalIcon,
  } from 'svelte-feather-icons';

  let self: HTMLDivElement;
  let text: string | null = null;
  let copied = false;

  export let filename: string | null = null;
  export let terminal = false;

  onMount(() => {
    const preIndex = filename == null && terminal == false ? 0 : 1;
    text = self.children[preIndex].textContent;
  });

  async function copy() {
    if (text == null) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      copied = true;
      setTimeout(() => (copied = false), 1000);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<div class="copyable" bind:this={self}>
  {#if filename != null}
    <div class="filename">
      <FileTextIcon size="16" class="mr" />
      {filename}
    </div>
  {:else if terminal}
    <div class="filename">
      <TerminalIcon size="16" class="mr" />
      Terminal
    </div>
  {/if}
  <slot />
  <Button small round title="Copy" on:click={copy}>
    {#if copied}
      <CheckIcon size="20" />
    {:else}
      <CopyIcon size="20" />
    {/if}
  </Button>
</div>

<style lang="scss">
  @use '$css/attractions-theme' as vars;

  .copyable {
    background: vars.$code-bg;
    border-radius: 0.3em;
    position: relative;

    .filename {
      align-items: center;
      display: flex;
      font-size: 0.8em;
      font-weight: 500;
      padding: 0.5em 1rem;
    }

    :global .filename + pre {
      margin-top: 0;
      padding-top: 0.5em;
    }

    > :global .btn {
      position: absolute;
      right: 0.3em;
      top: 0.3em;
    }
  }
</style>
